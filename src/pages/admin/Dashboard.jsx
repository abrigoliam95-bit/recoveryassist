import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../context/AuthContext'
import AdminLayout from '../../components/portal/AdminLayout'
import { getPendingCryptoPayments, confirmPayment } from '../../lib/payments'

const STATUS_OPTIONS = ['new', 'in_progress', 'resolved', 'closed']
const PRIORITY_OPTIONS = ['Standard', 'Elevated', 'High']
const PIPELINE_STAGES = ['Filed', 'Counsel Assigned', 'Investigation', 'Legal Action', 'Funds Recovered', 'Cleared for Disbursement']
const FEE_STATUS_LABELS = { invoiced: 'Invoiced', pending_approval: 'Pending Payment', paid: 'Paid' }

export default function Dashboard() {
  const { fullName, user } = useAuth()
  const [cases, setCases] = useState([])
  const [staffList, setStaffList] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  const [pendingPayments, setPendingPayments] = useState([])
  const [loadingPayments, setLoadingPayments] = useState(true)
  const [confirmingId, setConfirmingId] = useState(null)

  const [feeFormOpenFor, setFeeFormOpenFor] = useState(null)
  const [feeType, setFeeType] = useState('')
  const [feeAmount, setFeeAmount] = useState('')
  const [savingFee, setSavingFee] = useState(false)

  const [docketText, setDocketText] = useState('')
  const [savingDocket, setSavingDocket] = useState(false)

  useEffect(() => {
    fetchCases()
    fetchStaff()
    fetchPendingPayments()
  }, [])

  async function fetchCases() {
    setLoading(true)
    const { data, error } = await supabase
      .from('cases')
      .select('*, profiles!cases_client_id_fkey(full_name, email), fees(*), docket_updates(*)')
      .order('created_at', { ascending: false })

    if (!error) setCases(data || [])
    setLoading(false)
  }

  async function fetchStaff() {
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name')
      .in('role', ['staff', 'admin'])
    setStaffList(data || [])
  }

  async function fetchPendingPayments() {
    setLoadingPayments(true)
    try {
      const data = await getPendingCryptoPayments()
      setPendingPayments(data || [])
    } catch (error) {
      console.error('Error fetching payments:', error)
    }
    setLoadingPayments(false)
  }

  async function handleConfirmPayment(payment) {
    if (!user) return
    setConfirmingId(payment.id)
    try {
      await confirmPayment({
        paymentId: payment.id,
        invoiceId: payment.invoice_id,
        staffId: user.id
      })
      await fetchPendingPayments()
      await fetchCases()
    } catch (error) {
      console.error('Error confirming payment:', error)
      alert('Failed to confirm payment: ' + error.message)
    }
    setConfirmingId(null)
  }

  async function updateCase(caseId, fields) {
    await supabase.from('cases').update(fields).eq('id', caseId)
    await fetchCases()
  }

  async function handleAddFee(caseId) {
    if (!feeType || !feeAmount) return
    setSavingFee(true)
    await supabase.from('fees').insert({
      case_id: caseId,
      fee_type: feeType,
      amount: parseFloat(feeAmount),
      status: 'invoiced',
    })
    setFeeType('')
    setFeeAmount('')
    setFeeFormOpenFor(null)
    setSavingFee(false)
    await fetchCases()
  }

  async function handleAddDocketUpdate(caseId) {
    if (!docketText) return
    setSavingDocket(true)
    await supabase.from('docket_updates').insert({ case_id: caseId, update_text: docketText })
    setDocketText('')
    setSavingDocket(false)
    await fetchCases()
  }

  return (
    <AdminLayout>
      {/* UPDATED: padding now uses a class so it's mobile-responsive */}
      <div className="dashboard-page">
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, marginBottom: 4 }}>
            Cases{fullName ? ` — ${fullName.split(' ')[0]}` : ''}
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Every case, across every client.</p>
        </div>

        {/* --- PENDING PAYMENTS SECTION --- */}
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 18, marginBottom: 16, color: 'var(--gold)' }}>
            ⏳ Pending Crypto Payments ({pendingPayments.length})
          </h3>
          
          {loadingPayments && <p>Loading payments...</p>}
          
          {!loadingPayments && pendingPayments.length === 0 && (
            <div style={{ border: '1px solid var(--border)', borderRadius: 6, padding: 24, background: 'var(--surface)' }}>
              <p style={{ marginBottom: 0 }}>No pending crypto payments. You're all caught up! 🎉</p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pendingPayments.map((p) => (
              <div key={p.id} style={{ border: '1px solid var(--border)', borderRadius: 6, padding: 18, background: 'var(--surface)' }}>
                {/* UPDATED: Stack on mobile with flex-wrap */}
                <div className="payment-card-row">
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 'bold', margin: '0 0 4px' }}>
                      {p.invoices?.profiles?.full_name || 'Unknown Client'}
                    </p>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 8px', wordBreak: 'break-all' }}>
                      Invoice ID: {p.invoice_id}
                    </p>
                    <div style={{ fontSize: 13, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span><strong>Amount:</strong> {p.invoices?.amount_due} {p.invoices?.currency}</span>
                      <span style={{ wordBreak: 'break-all' }}><strong>Wallet:</strong> <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{p.wallet_address}</span></span>
                      <span style={{ wordBreak: 'break-all' }}><strong>TxHash:</strong> <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{p.tx_hash}</span></span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleConfirmPayment(p)}
                    disabled={confirmingId === p.id}
                    className="btn btn-gold payment-confirm-btn"
                    style={{ border: 'none', padding: '10px 20px', fontSize: 14, cursor: 'pointer', opacity: confirmingId === p.id ? 0.5 : 1 }}
                  >
                    {confirmingId === p.id ? 'Confirming...' : '✅ Confirm Payment'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h3 style={{ fontSize: 18, marginBottom: 16 }}>All cases ({cases.length})</h3>

        {loading && <p>Loading cases...</p>}
        {!loading && cases.length === 0 && (
          <div style={{ border: '1px solid var(--border)', borderRadius: 6, padding: 24 }}>
            <p style={{ marginBottom: 0 }}>No cases have been submitted yet.</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {cases.map((c) => {
            const isExpanded = expandedId === c.id
            return (
              <div key={c.id} style={{ border: '1px solid var(--border)', borderRadius: 6, padding: 18 }}>
                {/* SUMMARY ROW - UPDATED to stack on mobile */}
                <div className="case-summary-row">
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 12, color: 'var(--gold)', margin: '0 0 4px', fontWeight: 600 }}>
                      {c.case_number || 'Tracking number pending'}
                    </p>
                    <h4 style={{ fontSize: 16, margin: '0 0 4px', wordBreak: 'break-word' }}>{c.title}</h4>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, wordBreak: 'break-word' }}>
                      {c.profiles?.full_name || 'Unknown client'} · {c.profiles?.email}
                    </p>
                  </div>
                  <div className="case-actions-row">
                    <select
                      value={c.status}
                      onChange={(e) => updateCase(c.id, { status: e.target.value })}
                      style={selectStyle}
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                    </select>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : c.id)}
                      className="btn btn-outline-dark"
                      style={{ fontSize: 13, padding: '6px 12px' }}
                    >
                      {isExpanded ? 'Close' : 'Manage matter'}
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: 14, marginTop: 10, marginBottom: isExpanded ? 14 : 0 }}>{c.description}</p>

                {isExpanded && (
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {/* MATTER DETAILS - UPDATED for mobile */}
                    <div>
                      <p style={sectionLabel}>Matter details (shown on client dashboard)</p>
                      <div className="matter-details-grid">
                        <LabeledInput
                          label="Scheme type"
                          value={c.scheme_type || ''}
                          onBlur={(v) => updateCase(c.id, { scheme_type: v })}
                          placeholder="e.g. Wire transfer fraud"
                        />
                        <LabeledSelect
                          label="Priority"
                          value={c.priority}
                          onChange={(v) => updateCase(c.id, { priority: v })}
                          options={PRIORITY_OPTIONS}
                        />
                        <LabeledInput
                          label="Amount in dispute ($)"
                          type="number"
                          value={c.amount_in_dispute}
                          onBlur={(v) => updateCase(c.id, { amount_in_dispute: parseFloat(v) || 0 })}
                        />
                        <LabeledInput
                          label="Recovered amount ($)"
                          type="number"
                          value={c.recovered_amount}
                          onBlur={(v) => updateCase(c.id, { recovered_amount: parseFloat(v) || 0 })}
                        />
                        <LabeledInput
                          label="Recovery progress (%)"
                          type="number"
                          value={c.recovery_progress}
                          onBlur={(v) => updateCase(c.id, { recovery_progress: Math.max(0, Math.min(100, parseInt(v) || 0)) })}
                        />
                        <LabeledSelect
                          label="Pipeline stage"
                          value={PIPELINE_STAGES[c.pipeline_stage]}
                          onChange={(v) => updateCase(c.id, { pipeline_stage: PIPELINE_STAGES.indexOf(v) })}
                          options={PIPELINE_STAGES}
                        />
                        <LabeledSelect
                          label="Assigned counsel"
                          value={c.assigned_staff_id || ''}
                          onChange={(v) => updateCase(c.id, { assigned_staff_id: v || null })}
                          options={[{ value: '', label: 'Unassigned' }, ...staffList.map((s) => ({ value: s.id, label: s.full_name || 'Unnamed staff' }))]}
                          useValueLabel
                        />
                      </div>
                    </div>

                    {/* FEES */}
                    <div>
                      <p style={sectionLabel}>Fees</p>
                      {c.fees?.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                          {c.fees.map((fee) => (
                            <div key={fee.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                              <span>{fee.fee_type}</span>
                              <span style={{ color: 'var(--text-muted)' }}>${Number(fee.amount).toFixed(2)} · {FEE_STATUS_LABELS[fee.status]}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {feeFormOpenFor === c.id ? (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          <input placeholder="Fee type" value={feeType} onChange={(e) => setFeeType(e.target.value)} style={{ ...miniInput, flex: 1, minWidth: 140 }} />
                          <input type="number" step="0.01" placeholder="Amount" value={feeAmount} onChange={(e) => setFeeAmount(e.target.value)} style={{ ...miniInput, width: 100 }} />
                          <button onClick={() => handleAddFee(c.id)} disabled={savingFee} className="btn btn-gold" style={{ border: 'none', fontSize: 13, padding: '6px 14px' }}>
                            {savingFee ? 'Saving...' : 'Add fee'}
                          </button>
                          <button onClick={() => setFeeFormOpenFor(null)} style={cancelLink}>Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setFeeFormOpenFor(c.id)} className="btn btn-outline-dark" style={{ fontSize: 13, padding: '6px 14px' }}>+ Add fee</button>
                      )}
                    </div>

                    {/* DOCKET UPDATES */}
                    <div>
                      <p style={sectionLabel}>Docket updates (client-visible timeline)</p>
                      {c.docket_updates?.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                          {c.docket_updates
                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                            .map((d) => (
                              <div key={d.id} style={{ fontSize: 13 }}>
                                <span style={{ color: 'var(--text-muted)' }}>{new Date(d.created_at).toLocaleDateString()}</span> — {d.update_text}
                              </div>
                            ))}
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <input
                          placeholder="Add a docket update..."
                          value={expandedId === c.id ? docketText : ''}
                          onChange={(e) => setDocketText(e.target.value)}
                          style={{ ...miniInput, flex: 1, minWidth: 180 }}
                        />
                        <button
                          onClick={() => handleAddDocketUpdate(c.id)}
                          disabled={savingDocket}
                          className="btn btn-gold"
                          style={{ border: 'none', fontSize: 13, padding: '6px 14px' }}
                        >
                          {savingDocket ? 'Posting...' : 'Post'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}

function LabeledInput({ label, value, onBlur, type = 'text', placeholder }) {
  const [local, setLocal] = useState(value ?? '')
  return (
    <div>
      <label style={fieldLabel}>{label}</label>
      <input
        type={type}
        value={local}
        placeholder={placeholder}
        onChange={(e) => setLocal(e.target.value)}
        onBlur={() => onBlur(local)}
        style={miniInput}
      />
    </div>
  )
}

function LabeledSelect({ label, value, onChange, options, useValueLabel }) {
  return (
    <div>
      <label style={fieldLabel}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={miniInput}>
        {useValueLabel
          ? options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)
          : options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

const sectionLabel = { fontSize: 12, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase', color: 'var(--gold)', margin: '0 0 10px' }
const fieldLabel = { display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }
const miniInput = { width: '100%', padding: '7px 10px', fontSize: 13, border: '1px solid var(--border)', borderRadius: 4, fontFamily: 'var(--sans)' }
const selectStyle = { padding: '6px 10px', borderRadius: 4, border: '1px solid var(--border)', fontSize: 13, textTransform: 'capitalize' }
const cancelLink = { background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer' }
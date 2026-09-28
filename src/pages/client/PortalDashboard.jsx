import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PortalLayout from '../../components/portal/PortalLayout'
import RecoveryPipeline from '../../components/portal/RecoveryPipeline'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabaseClient'

export default function PortalDashboard() {
  const { user, fullName } = useAuth()
  const [cases, setCases] = useState([])
  const [fees, setFees] = useState([])
  const [counselName, setCounselName] = useState(null)
  const [docketUpdates, setDocketUpdates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchData()
  }, [user])

  async function fetchData() {
    setLoading(true)

    const { data: caseData } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false })
    const allCases = caseData || []
    setCases(allCases)

    const primary = allCases[0]

    if (primary) {
      const [{ data: feeData }, { data: docketData }] = await Promise.all([
        supabase.from('fees').select('*').eq('case_id', primary.id),
        supabase.from('docket_updates').select('*').eq('case_id', primary.id).order('created_at', { ascending: false }),
      ])
      setFees(feeData || [])
      setDocketUpdates(docketData || [])

      if (primary.assigned_staff_id) {
        const { data: staffProfile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', primary.assigned_staff_id)
          .single()
        setCounselName(staffProfile?.full_name || null)
      } else {
        setCounselName(null)
      }
    }

    setLoading(false)
  }

  const primary = cases[0]
  const activeMatters = cases.filter((c) => c.status !== 'closed' && c.status !== 'resolved').length
  const pendingFees = fees.filter((f) => f.status !== 'paid')
  const recoveryProgress = primary ? primary.recovery_progress : 0
  const lifetimeRecovered = cases.reduce((sum, c) => sum + Number(c.recovered_amount || 0), 0)

  if (loading) {
    return (
      <PortalLayout>
        <div style={{ padding: 40 }}>Loading your dashboard...</div>
      </PortalLayout>
    )
  }

  return (
    <PortalLayout>
      <div className="portal-dashboard">

        {/* WELCOME HEADER */}
        <section>
          <h1 style={{ fontSize: 26, marginBottom: 8 }}>
            Welcome back{fullName ? `, ${fullName.split(' ')[0]}` : ''}.
          </h1>
          <p style={{ fontSize: 15, maxWidth: '62ch', marginBottom: 14 }}>
            Your recovery team is on the matter. This portal summarizes the status of your
            active files, any actions required from you, and recent updates from your
            assigned counsel.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Badge color="#1f6e4f" bg="#e5f2eb">Encrypted session</Badge>
            <Badge color="var(--text-muted)" bg="var(--paper-raised)" border>On-call: 24/7</Badge>
          </div>
        </section>

        {!primary && (
          <Card>
            <p style={{ marginBottom: 16 }}>You don't have any matters on file yet.</p>
            <Link to="/file-a-claim" className="btn btn-gold" style={{ border: 'none' }}>File a new claim</Link>
          </Card>
        )}

        {primary && (
          <>
            {/* PRIMARY ACTIVE MATTER CARD */}
            <Card>
              <p style={sectionLabelStyle}>Primary active matter</p>
              <div className="matter-header-row">
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 18, margin: 0 }}>{primary.case_number || 'Pending'}</h3>
                    <Badge color="var(--teal)" bg="#e6f0ee">{primary.status.replace('_', ' ')}</Badge>
                    <Badge color="var(--gold)" bg="#f7ecd9">Priority: {primary.priority}</Badge>
                  </div>
                  <p style={{ fontSize: 14, margin: 0 }}>
                    {primary.scheme_type || primary.title} · Filed {new Date(primary.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Link to="/matters" className="btn btn-gold matter-open-btn">
                  Open matter file →
                </Link>
              </div>
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                <RecoveryPipeline activeStep={primary.pipeline_stage} />
              </div>
            </Card>

            {/* MATTER FINANCIALS ROW */}
            <div className="portal-grid grid-3">
              <StatCard label="Amount in dispute" value={`$${Number(primary.amount_in_dispute).toFixed(2)}`} />
              <StatCard label="Recovered to date" value={`$${Number(primary.recovered_amount).toFixed(2)}`} />
              <StatCard label="Recovery progress" value={`${recoveryProgress}%`}>
                <ProgressBar percent={recoveryProgress} />
              </StatCard>
            </div>

            {/* ACTION REQUIRED */}
            <div style={{ ...cardStyle, background: '#fbf3e3', border: '1px solid #ecd8a8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap', gap: 10 }}>
                <h3 style={{ fontSize: 17, margin: 0, color: '#7a5a1e' }}>Action required from you</h3>
                <Badge color="#7a5a1e" bg="#f2e2b8">{pendingFees.length} pending</Badge>
              </div>
              <p style={{ fontSize: 14, marginBottom: 16, color: '#7a5a1e' }}>
                Outstanding items must be resolved for your matter to proceed.
              </p>
              {pendingFees.length === 0 && (
                <p style={{ fontSize: 14, color: '#7a5a1e', marginBottom: 0 }}>Nothing outstanding right now.</p>
              )}
              {pendingFees.map((fee) => (
                <div key={fee.id} className="pending-fee-row">
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 14 }}>{fee.fee_type} — Matter {primary.case_number}</p>
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)' }}>
                      Issued {new Date(fee.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="pending-fee-actions">
                    <span style={{ fontWeight: 600 }}>${Number(fee.amount).toFixed(2)}</span>
                    <Link to="/billing" className="btn btn-gold" style={{ border: 'none', fontSize: 13 }}>Authorize payment</Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ACCOUNT SUMMARY CARDS */}
        <div className="portal-grid grid-4">
          <StatCard label="Recovered to date (lifetime)" value={`$${lifetimeRecovered.toFixed(2)}`} />
          <StatCard label="Cleared for disbursement" value="$0.00" sub="Released after KYC verification" />
          <StatCard label="Matters on file" value={cases.length} />
          <StatCard label="Active matters" value={activeMatters} />
        </div>

        {/* OPEN MATTERS TABLE */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ fontSize: 17, margin: 0 }}>Open matters</h3>
            <Link to="/matters" style={{ fontSize: 14 }}>View docket →</Link>
          </div>
          <div className="portal-table-scroll">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 600 }}>
              <thead>
                <tr style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: 12, textTransform: 'uppercase' }}>
                  <th style={thStyle}>Matter #</th>
                  <th style={thStyle}>Scheme</th>
                  <th style={thStyle}>Claim</th>
                  <th style={thStyle}>Recovery</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Filed</th>
                </tr>
              </thead>
              <tbody>
                {cases.length === 0 && (
                  <tr><td style={tdStyle} colSpan={6}>No matters on file yet.</td></tr>
                )}
                {cases.map((c) => {
                  const progress = c.recovery_progress
                  return (
                    <tr key={c.id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={tdStyle}>{c.case_number || '—'}</td>
                      <td style={tdStyle}>{c.scheme_type || c.title}</td>
                      <td style={tdStyle}>${Number(c.amount_in_dispute).toFixed(2)}</td>
                      <td style={tdStyle}>{progress}%</td>
                      <td style={tdStyle}><Badge color="var(--teal)" bg="#e6f0ee">{c.status.replace('_', ' ')}</Badge></td>
                      <td style={tdStyle}>{new Date(c.created_at).toLocaleDateString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* COUNSEL & UPDATES */}
        <div className="portal-grid grid-2">
          <Card>
            <p style={sectionLabelStyle}>Your counsel</p>
            <h3 style={{ fontSize: 17, margin: '0 0 4px' }}>
              {counselName || 'Recovery Operations Desk'}
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 18 }}>
              {counselName ? 'Assigned to your matter' : 'Awaiting counsel assignment'}
            </p>
            <Link to="/messages" className="btn btn-outline-dark" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              <LockIcon /> Send a secure message
            </Link>
          </Card>

          <Card>
            <p style={sectionLabelStyle}>Docket updates</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
              {docketUpdates.length === 0 && (
                <p style={{ fontSize: 14, margin: 0 }}>No updates posted yet.</p>
              )}
              {docketUpdates.map((d) => (
                <div key={d.id} style={{ display: 'flex', gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', marginTop: 7, flexShrink: 0 }} />
                  <p style={{ margin: 0, fontSize: 14 }}>
                    {new Date(d.created_at).toLocaleDateString()} · {primary?.case_number} — {d.update_text}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* COMPLIANCE & TRUST PANEL */}
        <Card>
          <p style={sectionLabelStyle}>Compliance & trust</p>
          <div className="portal-grid grid-3">
            <ComplianceItem title="KYC verified" body="Identity verification follows U.S. Know Your Customer standards before any funds are released." />
            <ComplianceItem title="Funds held in escrow" body="Recovered funds are held in a segregated escrow account until disbursement is cleared." />
            <ComplianceItem title="AML / CFT reviewed" body="Every matter is screened under Anti-Money Laundering and Counter-Financing of Terrorism standards." />
          </div>
        </Card>
      </div>
    </PortalLayout>
  )
}

function Card({ children }) { return <div style={cardStyle}>{children}</div> }

function Badge({ children, color, bg, border }) {
  return (
    <span style={{ fontSize: 12, fontWeight: 500, padding: '3px 10px', borderRadius: 12, color, background: bg, border: border ? '1px solid var(--border)' : 'none', whiteSpace: 'nowrap', textTransform: 'capitalize' }}>
      {children}
    </span>
  )
}

function StatCard({ label, value, sub, children }) {
  return (
    <Card>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 6px' }}>{label}</p>
      <p style={{ fontSize: 24, fontFamily: 'var(--serif)', color: 'var(--ink)', margin: 0, wordBreak: 'break-word' }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>{sub}</p>}
      {children && <div style={{ marginTop: 10 }}>{children}</div>}
    </Card>
  )
}

function ProgressBar({ percent }) {
  return (
    <div style={{ background: 'var(--border)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
      <div style={{ width: `${percent}%`, background: 'var(--gold)', height: '100%' }} />
    </div>
  )
}

function ComplianceItem({ title, body }) {
  return (
    <div>
      <h4 style={{ fontSize: 15, margin: '0 0 6px' }}>{title}</h4>
      <p style={{ fontSize: 13, margin: 0 }}>{body}</p>
    </div>
  )
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

const cardStyle = { background: 'var(--paper-raised)', border: '1px solid var(--border)', borderRadius: 6, padding: 22 }
const sectionLabelStyle = { fontSize: 12, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase', color: 'var(--gold)', margin: '0 0 12px' }
const thStyle = { padding: '8px 10px 8px 0' }
const tdStyle = { padding: '10px 10px 10px 0' }
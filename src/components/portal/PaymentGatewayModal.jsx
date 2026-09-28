import { useState } from 'react'

// A standard checkout modal — Bank Transfer or Card only.
// onClose closes the modal; onConfirm receives the chosen method.
export default function PaymentGatewayModal({ invoice, onClose }) {
  const [method, setMethod] = useState('bank')

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <h3 style={{ fontSize: 18, margin: 0 }}>Select payment method</h3>
          <button onClick={onClose} style={closeButtonStyle} aria-label="Close">×</button>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
          {invoice ? `${invoice.fee_type} — $${Number(invoice.amount).toFixed(2)}` : 'Invoice amount: $0.00'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
          <MethodOption
            id="bank"
            selected={method === 'bank'}
            onSelect={() => setMethod('bank')}
            title="Bank transfer (ACH / Wire)"
            subtitle="Standard for domestic clients"
          >
            {method === 'bank' && (
              <div style={detailsBoxStyle}>
                <p style={detailLine}><strong>Bank name:</strong> [Bank Name]</p>
                <p style={detailLine}><strong>Account name:</strong> [Company Name]</p>
                <p style={detailLine}><strong>Routing number:</strong> [Routing Number]</p>
                <p style={detailLine}><strong>Account number:</strong> [Account Number]</p>
                <p style={{ ...detailLine, marginBottom: 0 }}><strong>Reference:</strong> [Matter ID]</p>
              </div>
            )}
          </MethodOption>

          <MethodOption
            id="card"
            selected={method === 'card'}
            onSelect={() => setMethod('card')}
            title="Credit / debit card"
            subtitle="Standard card processing via our payment gateway"
          >
            {method === 'card' && (
              <div style={detailsBoxStyle}>
                <p style={{ ...detailLine, marginBottom: 0 }}>
                  Card payment is processed securely through our payment gateway. You'll be
                  taken to a secure checkout to complete this step.
                </p>
              </div>
            )}
          </MethodOption>
        </div>

        <button className="btn btn-gold" style={{ border: 'none', width: '100%' }}>
          Continue with {method === 'bank' ? 'bank transfer instructions' : 'card payment'}
        </button>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 16, marginBottom: 0 }}>
          Payments are for professional services and agreed retainers. Settling an invoice is a
          standard billing transaction and is entirely separate from any case settlement or fund
          distribution.
        </p>
      </div>
    </div>
  )
}

function MethodOption({ id, selected, onSelect, title, subtitle, children }) {
  return (
    <div
      onClick={onSelect}
      style={{
        border: selected ? '2px solid var(--gold)' : '1px solid var(--border)',
        borderRadius: 6,
        padding: 14,
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input type="radio" checked={selected} onChange={onSelect} />
        <div>
          <p style={{ margin: 0, fontWeight: 500, fontSize: 14 }}>{title}</p>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)' }}>{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(22, 35, 46, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
  padding: 20,
}

const modalStyle = {
  background: 'var(--paper-raised)',
  borderRadius: 8,
  padding: 26,
  maxWidth: 440,
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
}

const closeButtonStyle = {
  background: 'transparent',
  border: 'none',
  fontSize: 22,
  lineHeight: 1,
  cursor: 'pointer',
  color: 'var(--text-muted)',
}

const detailsBoxStyle = {
  marginTop: 12,
  paddingTop: 12,
  borderTop: '1px solid var(--border)',
}

const detailLine = { fontSize: 13, margin: '0 0 4px' }

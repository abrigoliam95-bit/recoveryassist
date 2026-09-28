import PortalLayout from '../../components/portal/PortalLayout'

export default function SupportTickets() {
  return (
    <PortalLayout>
      <div style={{ padding: '32px 24px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 26, marginBottom: 6 }}>Support tickets</h1>
            <p style={{ fontSize: 15, margin: 0 }}>View and manage your support requests.</p>
          </div>
          <button className="btn btn-gold" style={{ border: 'none', whiteSpace: 'nowrap' }}>
            + New ticket
          </button>
        </div>

        {/* EMPTY STATE */}
        <div
          style={{
            border: '1px dashed var(--border)',
            borderRadius: 6,
            padding: '64px 24px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <TicketIcon />
          </div>
          <h3 style={{ fontSize: 18, marginBottom: 6 }}>No tickets yet</h3>
          <p style={{ fontSize: 14, maxWidth: '40ch', margin: '0 auto 20px' }}>
            Create a support ticket to get help from our team.
          </p>
          <button className="btn btn-gold" style={{ border: 'none' }}>
            + Create ticket
          </button>
        </div>
      </div>
    </PortalLayout>
  )
}

function TicketIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
      <path d="M21 10V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 1 0 4v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 1 0-4Z" />
      <line x1="9" y1="4" x2="9" y2="20" strokeDasharray="2 2" />
    </svg>
  )
}

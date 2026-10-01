import { Link } from 'react-router-dom'
import { useState } from 'react'
import PortalLayout from '../../components/portal/PortalLayout'

const PLACEHOLDER_ROWS = [1, 2, 3]

export default function Matters() {
  const [filter, setFilter] = useState('all')

  return (
    <PortalLayout>
      <div style={{ padding: '32px 24px', maxWidth: 1000, margin: '0 auto' }}>

        {/* PAGE HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 26, marginBottom: 6 }}>Matters on file</h1>
            <p style={{ fontSize: 15, maxWidth: '55ch', margin: 0 }}>
              Every claim you have filed with the firm, with current status and recovery progress.
            </p>
          </div>
          <Link to="/file-a-claim" className="btn btn-gold" style={{ border: 'none', whiteSpace: 'nowrap' }}>
            + File a new claim
          </Link>
        </div>

        {/* FILTER SECTION */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 4,
              border: '1px solid var(--border)',
              fontSize: 14,
              fontFamily: 'var(--sans)',
            }}
            aria-label="Filter matters"
          >
            <option value="all">Filter matters — All</option>
            <option value="new">New</option>
            <option value="in_progress">In progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <button className="btn btn-outline-dark" style={{ fontSize: 14 }}>
            Show
          </button>
        </div>

        {/* MATTERS TABLE — collapses into stacked cards on mobile */}
        <div className="matters-table-wrap">
          <table className="matters-table">
            <thead>
              <tr>
                <th>Claim</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {PLACEHOLDER_ROWS.map((i) => (
                <tr key={i}>
                  <td data-label="Claim">
                    <div style={{ fontWeight: 500 }}>[Matter ID]</div>
                    {/* FIXED: Removed the "$0.00" hardcoded value that was confused with recovery progress */}
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Amount pending</div>
                  </td>
                  <td data-label="Status">
                    <span
                      style={{
                        fontSize: 12,
                        padding: '3px 10px',
                        borderRadius: 12,
                        background: '#e6f0ee',
                        color: 'var(--teal)',
                      }}
                    >
                      New
                    </span>
                  </td>
                  <td data-label="Action">
                    <button className="btn btn-outline-dark" style={{ fontSize: 13, padding: '6px 14px' }}>
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scoped responsive styling */}
      <style>{`
        .matters-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .matters-table thead th {
          text-align: left;
          font-size: 12px;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 8px 10px;
          border-bottom: 1px solid var(--border);
        }
        .matters-table tbody td {
          padding: 14px 10px;
          border-bottom: 1px solid var(--border);
          vertical-align: middle;
        }

        @media (max-width: 640px) {
          .matters-table thead {
            display: none;
          }
          .matters-table, .matters-table tbody, .matters-table tr, .matters-table td {
            display: block;
            width: 100%;
          }
          .matters-table tr {
            border: 1px solid var(--border);
            border-radius: 6px;
            margin-bottom: 12px;
            padding: 12px 14px;
            background: var(--paper-raised);
          }
          .matters-table td {
            border-bottom: none;
            padding: 6px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .matters-table td::before {
            content: attr(data-label);
            font-size: 12px;
            text-transform: uppercase;
            color: var(--text-muted);
          }
        }
      `}</style>
    </PortalLayout>
  )
}
const STEPS = [
  'Filed',
  'Counsel Assigned',
  'Investigation',
  'Legal Action',
  'Funds Recovered',
  'Cleared for Disbursement',
]

// activeStep is the index (0-based) of the current step — everything
// from there onward is shown greyed out / not yet reached.
export default function RecoveryPipeline({ activeStep = 0 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {STEPS.map((label, i) => {
        const isActive = i === activeStep
        const isDone = i < activeStep
        const isLast = i === STEPS.length - 1

        return (
          <div key={label} style={{ display: 'flex', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: isActive || isDone ? 'var(--gold)' : 'var(--paper)',
                  border: isActive || isDone ? '2px solid var(--gold)' : '2px solid var(--border)',
                }}
              />
              {!isLast && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 28,
                    background: isDone ? 'var(--gold)' : 'var(--border)',
                  }}
                />
              )}
            </div>
            <div style={{ paddingBottom: isLast ? 0 : 18 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--ink)' : isDone ? 'var(--text)' : 'var(--text-muted)',
                }}
              >
                {label}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

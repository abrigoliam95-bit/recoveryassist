// A 4-step horizontal progress bar for the disbursement flow.
// activeStep is the 0-based index of the current step.
export default function HorizontalStepper({ steps, activeStep = 0 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {steps.map((label, i) => {
        const isActive = i === activeStep
        const isDone = i < activeStep
        const isLast = i === steps.length - 1

        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', flex: isLast ? 'none' : 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 600,
                  background: isActive || isDone ? 'var(--gold)' : 'var(--paper)',
                  color: isActive || isDone ? '#fff' : 'var(--text-muted)',
                  border: isActive || isDone ? 'none' : '1px solid var(--border)',
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <span
                style={{
                  fontSize: 12,
                  textAlign: 'center',
                  maxWidth: 90,
                  color: isActive ? 'var(--ink)' : 'var(--text-muted)',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {label}
              </span>
            </div>
            {!isLast && (
              <div style={{ flex: 1, height: 2, background: isDone ? 'var(--gold)' : 'var(--border)', margin: '0 8px 20px' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

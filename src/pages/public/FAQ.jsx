import { useState } from 'react'
import PublicLayout from '../../components/PublicLayout'

const faqs = [
  ['Do I have to pay anything to file a claim?', 'No upfront fees are required to submit an initial claim. Any fees associated with your matter are disclosed in advance and billed in accordance with your signed service agreement.'],
  ['How long does a case usually take?', 'Every case is different, and timelines depend on the specifics of your matter, the parties involved, and applicable regulatory processes. Your case handler will keep you updated on realistic expectations for your situation.'],
  ['Is my information kept confidential?', 'Yes. Your case details are only visible to you and the staff assigned to your matter, and are protected under our Privacy Policy.'],
  ['What information should I include when I file a claim?', 'Include as much detail as you can: dates, amounts, platforms or people involved, and any supporting documents like screenshots, emails, or bank statements.'],
  ['Can I track the progress of my case?', 'Yes. Once logged in, your client dashboard shows your case status, recovery progress, and any updates posted by your case handler.'],
  ['Do you guarantee a full recovery?', 'No legitimate recovery service can guarantee a specific outcome. We pursue every case with diligence, but recovery depends on factors outside our control, including where funds were sent and the cooperation of third parties.'],
  ['How do I contact my case handler?', 'You can send a secure message directly from your client dashboard once your case has been assigned to a handler.'],
  ['What if I need help outside business hours?', 'Our support desk is available around the clock for urgent enquiries — use the contact options on our Contact page.'],
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <PublicLayout>
      <img
        src="/images/support-strip.jpg"
        alt="Support agent ready to answer questions"
        style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
      />
      <section className="container" style={{ padding: '56px 0 72px', maxWidth: 720 }}>
        <p style={{ color: 'var(--gold)', fontSize: 15, marginBottom: 14 }}>FAQ</p>
        <h1 style={{ fontSize: 34, marginBottom: 36 }}>Frequently asked questions</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {faqs.map(([q, a], i) => {
            const isOpen = openIndex === i
            return (
              <div key={q} style={{ border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '16px 20px', background: 'var(--paper-raised)', border: 'none', cursor: 'pointer',
                    fontSize: 15, fontFamily: 'var(--sans)', textAlign: 'left',
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{q}</span>
                  <span style={{ fontSize: 18, color: 'var(--text-muted)' }}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 20px 18px' }}>
                    <p style={{ fontSize: 14, margin: 0 }}>{a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </PublicLayout>
  )
}

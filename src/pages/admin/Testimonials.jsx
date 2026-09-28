import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import AdminLayout from '../../components/portal/AdminLayout'

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAll()
  }, [])

  async function fetchAll() {
    setLoading(true)
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
    setTestimonials(data || [])
    setLoading(false)
  }

  async function setStatus(id, status) {
    await supabase.from('testimonials').update({ status }).eq('id', id)
    await fetchAll()
  }

  async function remove(id) {
    if (!window.confirm('Delete this testimonial permanently?')) return
    await supabase.from('testimonials').delete().eq('id', id)
    await fetchAll()
  }

  const pending = testimonials.filter((t) => t.status === 'pending')
  const others = testimonials.filter((t) => t.status !== 'pending')

  return (
    <AdminLayout>
      <div style={{ padding: '48px 32px', maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: 26, marginBottom: 24 }}>Testimonials</h1>

        {loading && <p>Loading...</p>}

        <h3 style={{ fontSize: 17, marginBottom: 12 }}>Pending review ({pending.length})</h3>
        {pending.length === 0 && <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Nothing waiting for review.</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {pending.map((t) => (
            <TestimonialCard key={t.id} t={t} onApprove={() => setStatus(t.id, 'approved')} onReject={() => setStatus(t.id, 'rejected')} onDelete={() => remove(t.id)} />
          ))}
        </div>

        <h3 style={{ fontSize: 17, marginBottom: 12 }}>Approved / rejected</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {others.map((t) => (
            <TestimonialCard key={t.id} t={t} onDelete={() => remove(t.id)} />
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

function TestimonialCard({ t, onApprove, onReject, onDelete }) {
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 6, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
        <div>
          <p style={{ margin: 0, fontWeight: 500 }}>{t.full_name} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>· {t.email}</span></p>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--gold)' }}>{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</p>
        </div>
        <span style={{
          fontSize: 12, padding: '3px 10px', borderRadius: 12, textTransform: 'capitalize', height: 'fit-content',
          background: t.status === 'approved' ? '#e6f0ee' : t.status === 'rejected' ? '#f5e3e3' : 'var(--paper)',
          color: t.status === 'approved' ? 'var(--teal)' : t.status === 'rejected' ? '#b23b3b' : 'var(--text-muted)',
        }}>
          {t.status}
        </span>
      </div>
      <p style={{ fontSize: 14, marginBottom: 12 }}>{t.testimonial_text}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        {onApprove && <button onClick={onApprove} className="btn btn-gold" style={{ border: 'none', fontSize: 13, padding: '6px 14px' }}>Approve</button>}
        {onReject && <button onClick={onReject} className="btn btn-outline-dark" style={{ fontSize: 13, padding: '6px 14px' }}>Reject</button>}
        <button onClick={onDelete} style={{ background: 'transparent', border: '1px solid #b23b3b', color: '#b23b3b', borderRadius: 3, fontSize: 13, padding: '6px 14px', cursor: 'pointer' }}>Delete</button>
      </div>
    </div>
  )
}

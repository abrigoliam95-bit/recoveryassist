import { CheckCircle2, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getInvoice, getPaymentsForInvoice, submitCryptoPayment } from '../../../lib/payments'

// ------------------------------------------------------------
// WHAT THIS PAGE DOES
// A client lands here after staff sends them a bill. It shows:
//   1. How much they owe
//   2. A "Pay with Crypto" box with our wallet address + a form
//      to paste in their transaction hash once they've sent it
//   3. A "Pay by Bank Transfer" box (built in the next step)
//   4. A list of any payment attempts already made, so they can
//      see if something is still pending or already confirmed
// ------------------------------------------------------------

// Placeholder — replace with the org's real receiving wallet(s)
// before this goes live. In a real build these would likely come
// from a settings table rather than being hardcoded here.
const CRYPTO_OPTIONS = [
  { code: 'BTC', label: 'Bitcoin', address: 'bc1qPLACEHOLDERPLACEHOLDERPLACEHOLDER' },
  { code: 'USDT_TRC20', label: 'USDT (TRC-20)', address: 'TPLACEHOLDERPLACEHOLDERPLACEHOLDER' },
]

export default function Invoice() {
  const { invoiceId } = useParams()
  const [invoice, setInvoice] = useState(null)
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function loadData() {
    setLoading(true)
    setError(null)
    try {
      const [invoiceData, paymentsData] = await Promise.all([
        getInvoice(invoiceId),
        getPaymentsForInvoice(invoiceId),
      ])
      setInvoice(invoiceData)
      setPayments(paymentsData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceId])

  if (loading) return <p className="px-4 py-8 text-sm text-slate-500">Loading invoice…</p>
  if (error) return <p className="px-4 py-8 text-sm text-red-600">Error: {error}</p>
  if (!invoice) return <p className="px-4 py-8 text-sm text-slate-500">Invoice not found.</p>

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-8">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">Invoice</p>
        <h1 className="text-2xl font-semibold text-slate-900">
          {invoice.currency} {Number(invoice.amount_due).toFixed(2)}
        </h1>
        <StatusBadge status={invoice.status} />
      </div>

      {invoice.status === 'paid' ? (
        <div className="flex items-center gap-2 rounded-md bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle2 className="h-5 w-5" />
          This invoice has been paid. Thank you.
        </div>
      ) : (
        <CryptoPaymentBox invoiceId={invoice.id} onSubmitted={loadData} />
      )}

      {payments.length > 0 && (
        <div>
          <h2 className="mb-2 text-sm font-semibold text-slate-900">Payment history</h2>
          <ul className="space-y-2">
            {payments.map((p) => (
              <li key={p.id} className="rounded-md border border-slate-200 p-3 text-sm">
                <span className="font-medium capitalize">{p.method.replace('_', ' ')}</span>
                {' — '}
                <StatusBadge status={p.status} inline />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status, inline }) {
  const styles = {
    pending: 'bg-amber-100 text-amber-800',
    paid: 'bg-green-100 text-green-800',
    confirmed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    cancelled: 'bg-slate-100 text-slate-600',
  }
  return (
    <span
      className={`${inline ? '' : 'mt-2 inline-block'} rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] ?? 'bg-slate-100 text-slate-600'}`}
    >
      {status}
    </span>
  )
}

function CryptoPaymentBox({ invoiceId, onSubmitted }) {
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_OPTIONS[0].code)
  const [txHash, setTxHash] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [justSubmitted, setJustSubmitted] = useState(false)

  const option = CRYPTO_OPTIONS.find((o) => o.code === selectedCrypto)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await submitCryptoPayment({
        invoiceId,
        cryptoCurrency: selectedCrypto,
        walletAddress: option.address,
        txHash: txHash.trim(),
      })
      setJustSubmitted(true)
      setTxHash('')
      onSubmitted?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  function copyAddress() {
    navigator.clipboard?.writeText(option.address)
  }

  return (
    <div className="rounded-lg border border-slate-200 p-5">
      <h2 className="text-sm font-semibold text-slate-900">Pay with Crypto</h2>

      <label htmlFor="crypto-select" className="mt-4 block text-xs font-medium text-slate-600">
        Choose currency
      </label>
      <select
        id="crypto-select"
        value={selectedCrypto}
        onChange={(e) => setSelectedCrypto(e.target.value)}
        className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
      >
        {CRYPTO_OPTIONS.map((o) => (
          <option key={o.code} value={o.code}>
            {o.label}
          </option>
        ))}
      </select>

      <div className="mt-4 rounded-md bg-slate-50 p-3">
        <p className="text-xs text-slate-500">Send payment to this address:</p>
        <div className="mt-1 flex items-center gap-2">
          <code className="flex-1 break-all text-xs text-slate-800">{option.address}</code>
          <button
            type="button"
            onClick={copyAddress}
            aria-label="Copy address"
            className="rounded p-1.5 text-slate-500 hover:bg-slate-200"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Once you've sent the payment, paste the transaction hash (receipt code) below so our
        team can confirm it.
      </p>

      <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
        <input
          type="text"
          required
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          placeholder="Transaction hash"
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {submitting ? 'Submitting…' : 'Submit'}
        </button>
      </form>

      {justSubmitted && (
        <p className="mt-2 text-xs text-green-700">
          Submitted — our team will confirm your payment shortly.
        </p>
      )}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}

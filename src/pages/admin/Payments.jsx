import { ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { confirmPayment, getPendingCryptoPayments } from '../../../lib/payments'

// ------------------------------------------------------------
// WHAT THIS PAGE DOES
// Staff/admin land here to see every crypto payment a client has
// claimed to send, but that nobody has checked yet. For each one,
// staff opens a block explorer link to verify the transaction
// really happened, then clicks "Confirm" — which is the ONLY
// button in the whole app that's allowed to mark a payment (and
// its invoice) as paid. Remember: the database itself enforces
// this via RLS — a client could never reach this screen even if
// they typed the URL directly, because their role isn't allowed
// to see other people's payments.
// ------------------------------------------------------------

// Small helper: builds a link to a public block explorer so staff
// can check a transaction without leaving the page. Real projects
// would likely expand this list or use an API instead of a link.
function explorerUrl(currency, txHash) {
  if (currency === 'BTC') return `https://www.blockchain.com/explorer/transactions/btc/${txHash}`
  if (currency?.startsWith('USDT')) return `https://tronscan.org/#/transaction/${txHash}`
  return null
}

export default function Payments() {
  const { user } = useAuth()
  const [pending, setPending] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [confirmingId, setConfirmingId] = useState(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await getPendingCryptoPayments()
      setPending(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleConfirm(payment) {
    setConfirmingId(payment.id)
    try {
      await confirmPayment({
        paymentId: payment.id,
        invoiceId: payment.invoices.id,
        staffId: user.id,
      })
      await load() // refresh the list so the confirmed one disappears
    } catch (err) {
      setError(err.message)
    } finally {
      setConfirmingId(null)
    }
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-xl font-semibold text-slate-900">Pending Crypto Payments</h1>
      <p className="mt-1 text-sm text-slate-500">
        Verify each transaction on a block explorer before confirming.
      </p>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {loading && <p className="mt-4 text-sm text-slate-500">Loading…</p>}

      {!loading && pending.length === 0 && (
        <p className="mt-6 text-sm text-slate-500">Nothing waiting on confirmation. 🎉</p>
      )}

      <div className="mt-6 space-y-3">
        {pending.map((p) => {
          const url = explorerUrl(p.crypto_currency, p.tx_hash)
          return (
            <div key={p.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {p.invoices.currency} {Number(p.invoices.amount_due).toFixed(2)}
                    <span className="ml-2 text-xs font-normal text-slate-500">
                      via {p.crypto_currency}
                    </span>
                  </p>
                  <p className="mt-1 break-all text-xs text-slate-500">tx: {p.tx_hash}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleConfirm(p)}
                  disabled={confirmingId === p.id}
                  className="shrink-0 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
                >
                  {confirmingId === p.id ? 'Confirming…' : 'Confirm'}
                </button>
              </div>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:underline"
                >
                  Check on block explorer <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

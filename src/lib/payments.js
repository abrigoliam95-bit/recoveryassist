import { supabase } from './supabaseClient'

// ------------------------------------------------------------
// WHAT THIS FILE IS FOR
// Every screen that needs to talk to the "invoices" or "payments"
// tables calls one of these functions instead of writing its own
// database query.
// ------------------------------------------------------------

/**
 * Get the most recent UNPAID invoice for the currently logged-in client.
 * Returns null if there are no unpaid invoices (instead of throwing).
 */
export async function getMyUnpaidInvoice() {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('You must be logged in.')

  const { data, error } = await supabase
    .from('invoices')
    .select('id, amount_due, currency, status')
    .eq('client_id', user.id)
    .neq('status', 'paid')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle() // <-- CHANGED: no error if zero rows found

  if (error) throw error
  return data // can be null if no unpaid invoice exists
}

/**
 * Get one invoice by its ID, for the currently logged-in client.
 */
export async function getInvoice(invoiceId) {
  const { data, error } = await supabase
    .from('invoices')
    .select('id, case_id, amount_due, currency, status, created_at')
    .eq('id', invoiceId)
    .single()

  if (error) throw error
  return data
}

/**
 * Get every payment attempt that's been made against one invoice.
 */
export async function getPaymentsForInvoice(invoiceId) {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('invoice_id', invoiceId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Client submits proof they sent a crypto payment.
 */
export async function submitCryptoPayment({ invoiceId, cryptoCurrency, walletAddress, txHash }) {
  const { data, error } = await supabase
    .from('payments')
    .insert({
      invoice_id: invoiceId,
      method: 'crypto',
      status: 'pending',
      crypto_currency: cryptoCurrency,
      wallet_address: walletAddress,
      tx_hash: txHash,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * STAFF ONLY (enforced by RLS): list every crypto payment still pending.
 */
export async function getPendingCryptoPayments() {
  const { data, error } = await supabase
    .from('payments')
    .select('*, invoices(id, amount_due, currency, client_id, profiles(full_name))')
    .eq('method', 'crypto')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

/**
 * STAFF ONLY (enforced by RLS): mark a payment as confirmed and mark its invoice as paid.
 */
export async function confirmPayment({ paymentId, invoiceId, staffId }) {
  const { error: paymentError } = await supabase
    .from('payments')
    .update({
      status: 'confirmed',
      confirmed_by: staffId,
      confirmed_at: new Date().toISOString(),
    })
    .eq('id', paymentId)

  if (paymentError) throw paymentError

  const { error: invoiceError } = await supabase
    .from('invoices')
    .update({ status: 'paid' })
    .eq('id', invoiceId)

  if (invoiceError) throw invoiceError
}
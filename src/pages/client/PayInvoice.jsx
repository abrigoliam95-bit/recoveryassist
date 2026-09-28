import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { submitCryptoPayment, getMyUnpaidInvoice } from '../../lib/payments';
import { WALLETS } from '../../lib/walletConfig';

export default function PayInvoice() {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [txHash, setTxHash] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const [invoice, setInvoice] = useState(null);
  const [loadingInvoice, setLoadingInvoice] = useState(true);

  const activeWallet = WALLETS[selectedCoin];

  // Load the logged-in user's unpaid invoice
  useEffect(() => {
    async function loadInvoice() {
      try {
        const data = await getMyUnpaidInvoice();
        setInvoice(data);
      } catch (error) {
        setMessage('error: ' + error.message);
      } finally {
        setLoadingInvoice(false);
      }
    }
    loadInvoice();
  }, []);

  // Copy wallet address to clipboard
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(activeWallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handlePay = async (e) => {
    e.preventDefault();

    if (!invoice) {
      setMessage('error: No unpaid invoice found to pay.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      await submitCryptoPayment({
        invoiceId: invoice.id,
        cryptoCurrency: selectedCoin,
        walletAddress: activeWallet.address,
        txHash: txHash,
      });

      setMessage('success');
      setTxHash('');
    } catch (error) {
      setMessage('error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while the invoice is being fetched
  if (loadingInvoice) {
    return (
      <div style={styles.loadingScreen}>
        <p>Finding your invoice...</p>
      </div>
    );
  }

  // Show "all caught up" only AFTER loading finishes, when invoice is null
  if (!invoice) {
    return (
      <div style={styles.loadingScreen}>
        <div style={{ textAlign: 'center', maxWidth: 400, padding: '0 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
          <h2 style={{ color: 'var(--ink)', marginBottom: '8px' }}>You're all caught up</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>
            There are no unpaid invoices on your account right now. If you believe
            this is a mistake, please contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.cardWrapper}>

        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Crypto Payment</h1>
          <p style={styles.headerSubtitle}>Send payment and submit your transaction proof</p>
        </div>

        {/* INVOICE SUMMARY */}
        <div style={styles.invoiceBox}>
          <p style={styles.invoiceLabel}>Amount Due</p>
          <p style={styles.invoiceAmount}>
            {invoice.amount_due} {invoice.currency}
          </p>
        </div>

        {/* STEP 1: CHOOSE COIN */}
        <div style={styles.section}>
          <p style={styles.stepLabel}>Step 1 — Choose cryptocurrency</p>
          <div style={styles.coinTabs}>
            {Object.values(WALLETS).map((coin) => (
              <button
                key={coin.symbol}
                type="button"
                onClick={() => setSelectedCoin(coin.symbol)}
                style={{
                  ...styles.coinTab,
                  background: selectedCoin === coin.symbol ? coin.color : 'transparent',
                  color: selectedCoin === coin.symbol ? '#fff' : 'var(--ink)',
                  borderColor: selectedCoin === coin.symbol ? coin.color : 'var(--border)',
                }}
              >
                {coin.symbol}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 2: SEND TO THIS ADDRESS */}
        <div style={styles.section}>
          <p style={styles.stepLabel}>Step 2 — Send to this address</p>

          <div style={styles.walletCard}>
            {/* QR CODE */}
            <div style={styles.qrBox}>
              <QRCode
                value={activeWallet.address}
                size={160}
                bgColor="#ffffff"
                fgColor="#16232e"
                level="M"
              />
            </div>

            {/* ADDRESS + COPY */}
            <div style={styles.addressBox}>
              <p style={styles.networkLabel}>{activeWallet.network}</p>
              <div style={styles.addressRow}>
                <code style={styles.addressText}>{activeWallet.address}</code>
              </div>
              <button
                type="button"
                onClick={copyAddress}
                style={styles.copyBtn}
              >
                {copied ? '✓ Copied' : '📋 Copy Address'}
              </button>
            </div>
          </div>

          {/* WARNING */}
          <div style={styles.warningBox}>
            <span style={styles.warningIcon}>⚠️</span>
            <p style={styles.warningText}>{activeWallet.warning}</p>
          </div>
        </div>

        {/* STEP 3: SUBMIT PROOF */}
        <div style={styles.section}>
          <p style={styles.stepLabel}>Step 3 — Submit your transaction hash</p>

          <form onSubmit={handlePay}>
            <div style={{ marginBottom: '20px' }}>
              <label style={styles.inputLabel}>Transaction Hash (TxHash)</label>
              <input
                type="text"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                required
                placeholder="0x… or your transaction ID"
                style={styles.input}
              />
              <p style={styles.inputHint}>
                Paste the transaction hash from your wallet after sending the payment.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                ...styles.submitBtn,
                opacity: isSubmitting ? 0.5 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? 'Submitting…' : 'Submit Payment'}
            </button>
          </form>

          {message === 'success' && (
            <div style={styles.successBox}>
              <p style={styles.successTitle}>Payment Submitted!</p>
              <p style={styles.successText}>
                Our staff will verify your transaction shortly.
              </p>
            </div>
          )}

          {message.startsWith('error') && (
            <div style={styles.errorBox}>
              <p style={styles.errorTitle}>Submission Failed</p>
              <p style={styles.errorText}>{message.replace('error: ', '')}</p>
            </div>
          )}
        </div>

        {/* NOTE */}
        <div style={styles.noteBox}>
          <p style={styles.noteText}>
            <strong>ℹ️ Note:</strong> This is a manual verification system. After you submit
            your transaction hash, our staff will verify the payment on the blockchain and
            mark your invoice as paid.
          </p>
        </div>

      </div>
    </div>
  );
}

// =============================================
// STYLES
// =============================================
const styles = {
  loadingScreen: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--paper)',
    color: 'var(--text-muted)',
  },
  pageWrapper: {
    minHeight: '100vh',
    background: 'var(--paper)',
    padding: '32px 16px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cardWrapper: {
    width: '100%',
    maxWidth: '560px',
    background: 'var(--paper-raised)',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 10px 30px rgba(22, 35, 46, 0.06)',
    border: '1px solid var(--border)',
  },
  header: {
    marginBottom: '24px',
  },
  headerTitle: {
    fontSize: '26px',
    margin: 0,
    color: 'var(--ink)',
    fontFamily: 'var(--serif)',
  },
  headerSubtitle: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    margin: '4px 0 0 0',
  },
  invoiceBox: {
    background: 'var(--paper)',
    padding: '16px 20px',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    marginBottom: '28px',
  },
  invoiceLabel: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  invoiceAmount: {
    fontSize: '26px',
    fontWeight: '700',
    color: 'var(--ink)',
    margin: '4px 0 0 0',
  },
  section: {
    marginBottom: '28px',
  },
  stepLabel: {
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
    margin: '0 0 12px 0',
  },
  coinTabs: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  coinTab: {
    flex: 1,
    minWidth: '70px',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  walletCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    background: 'var(--paper)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
  },
  qrBox: {
    background: '#fff',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid var(--border)',
  },
  addressBox: {
    width: '100%',
    textAlign: 'center',
  },
  networkLabel: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    margin: '0 0 8px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  addressRow: {
    background: 'var(--paper-raised)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    padding: '10px 12px',
    marginBottom: '10px',
    wordBreak: 'break-all',
  },
  addressText: {
    fontFamily: 'monospace',
    fontSize: '13px',
    color: 'var(--ink)',
  },
  copyBtn: {
    background: 'var(--ink)',
    color: '#fff',
    border: 'none',
    padding: '9px 16px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  warningBox: {
    display: 'flex',
    gap: '10px',
    background: '#fef9e7',
    border: '1px solid #fde68a',
    borderRadius: '8px',
    padding: '12px 14px',
    marginTop: '12px',
  },
  warningIcon: {
    fontSize: '16px',
    flexShrink: 0,
  },
  warningText: {
    fontSize: '13px',
    color: '#92400e',
    margin: 0,
    lineHeight: '1.5',
  },
  inputLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--ink)',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'monospace',
    outline: 'none',
    background: 'var(--paper)',
    color: 'var(--text)',
    boxSizing: 'border-box',
  },
  inputHint: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    margin: '6px 0 0 0',
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    background: 'var(--gold)',
    color: '#fff',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    fontSize: '15px',
    transition: 'all 0.15s ease',
  },
  successBox: {
    marginTop: '20px',
    padding: '14px 16px',
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '8px',
  },
  successTitle: {
    fontWeight: '600',
    color: '#166534',
    margin: 0,
    fontSize: '14px',
  },
  successText: {
    fontSize: '13px',
    color: '#15803d',
    margin: '4px 0 0 0',
  },
  errorBox: {
    marginTop: '20px',
    padding: '14px 16px',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
  },
  errorTitle: {
    fontWeight: '600',
    color: '#991b1b',
    margin: 0,
    fontSize: '14px',
  },
  errorText: {
    fontSize: '13px',
    color: '#b91c1c',
    margin: '4px 0 0 0',
  },
  noteBox: {
    marginTop: '20px',
    padding: '14px 16px',
    background: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '8px',
  },
  noteText: {
    fontSize: '12px',
    color: '#1e40af',
    margin: 0,
    lineHeight: '1.5',
  },
};
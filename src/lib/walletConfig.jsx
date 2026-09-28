// =============================================
// WALLET CONFIGURATION
// =============================================
// Replace the placeholder addresses with the real ones when ready.
// Only change the `address` field for each coin.

export const WALLETS = {
  BTC: {
    name: 'Bitcoin',
    symbol: 'BTC',
    network: 'Bitcoin Network',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', // ← YOUR REAL BTC ADDRESS HERE
    warning: 'Only send Bitcoin (BTC) to this address. Sending other coins will result in lost funds.',
    color: '#f7931a',
  },
  USDT: {
    name: 'Tether',
    symbol: 'USDT',
    network: 'TRC20 (Tron)',
    address: 'PLACEHOLDER_USDT_ADDRESS', // ← REPLACE WITH REAL USDT ADDRESS WHEN READY
    warning: 'Only send USDT on the TRC20 network. Sending USDT on any other network (ERC20, BEP20, etc.) will result in lost funds.',
    color: '#26a17b',
  },
  ETH: {
    name: 'Ethereum',
    symbol: 'ETH',
    network: 'Ethereum Mainnet',
    address: 'PLACEHOLDER_ETH_ADDRESS', // ← REPLACE WITH REAL ETH ADDRESS WHEN READY
    warning: 'Only send Ethereum (ETH) on the Ethereum Mainnet. Sending on other networks will result in lost funds.',
    color: '#627eea',
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    network: 'ERC20 (Ethereum)',
    address: 'PLACEHOLDER_USDC_ADDRESS', // ← REPLACE WITH REAL USDC ADDRESS WHEN READY
    warning: 'Only send USDC on the ERC20 network (Ethereum). Sending on other networks will result in lost funds.',
    color: '#2775ca',
  },
}
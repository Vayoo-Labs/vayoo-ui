import { PublicKey } from "@solana/web3.js";

export const VAYOO_BACKEND_ENDPOINT = import.meta.env.VITE_VAYOO_BACKEND_API || 'https://backend.vayoo.markets';
export const RPC = "https://api.metaplex.solana.com/"

export const VAYOO_CONTRACT_ID = new PublicKey('6ccnZSaDcMwKe1xwHbubs4q2GdPEr7hSK59A3GddJpte');
export const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
export const SUPER_USER_KEY = new PublicKey("4gNFEk4qvgxE6iM8ukfDUDaCT8itAeWXxURbnqNZXZXp");
export const COLLATERAL_MINT = USDC_MINT;

export const ADMIN_KEYS = ['CkvRjxTtotXBuYjBXVkcyDfd3qoEgeLnQecxFfPg1ZcN','4gNFEk4qvgxE6iM8ukfDUDaCT8itAeWXxURbnqNZXZXp'];
export const REFRESH_TIME_INTERVAL = 60_000;
export const TRADE_SLIPPAGE = 100; //10% percentage

export const USER_TRADE_CAP_USD = 200;
import { PublicKey } from "@solana/web3.js";

export const VAYOO_BACKEND_ENDPOINT = import.meta.env.VITE_VAYOO_BACKEND_API || 'http://localhost:3001';
export const RPC = import.meta.env.VITE_RPC_ENDPOINT || "https://api.metaplex.solana.com/";

const VAYOO_CONTRACT_ID = import.meta.env.VITE_VAYOO_PROGRAM_ID || '6ccnZSaDcMwKe1xwHbubs4q2GdPEr7hSK59A3GddJpte';
export const VAYOO_CONTRACT_KEY = new PublicKey(VAYOO_CONTRACT_ID);

export const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
export const SUPER_USER_KEY = new PublicKey("4gNFEk4qvgxE6iM8ukfDUDaCT8itAeWXxURbnqNZXZXp");
export const COLLATERAL_MINT = USDC_MINT;

export const ADMIN_KEYS = ['CkvRjxTtotXBuYjBXVkcyDfd3qoEgeLnQecxFfPg1ZcN','4gNFEk4qvgxE6iM8ukfDUDaCT8itAeWXxURbnqNZXZXp'];
export const REFRESH_TIME_INTERVAL = 60_000;

export const USER_TRADE_CAP_USD = 200;

export const DUMMY_PYTH_KEY = "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD";
export const DUMMY_SWITCHBOARD_KEY = "ETAaeeuQBwsh9mC2gCov9WdhJENZuffRMXY2HgjCcSL9";
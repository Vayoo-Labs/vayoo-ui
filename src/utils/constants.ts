import { PublicKey } from "@solana/web3.js";

export const REFRESH_TIME_INTERVAL = 60_000;


export const VAYOO_CONTRACT_ID = new PublicKey('6ccnZSaDcMwKe1xwHbubs4q2GdPEr7hSK59A3GddJpte');
export const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
export const SUPER_USER_KEY = new PublicKey("4gNFEk4qvgxE6iM8ukfDUDaCT8itAeWXxURbnqNZXZXp");
export const CONTRACT_NAME = "v1";
export const COLLATERAL_MINT = USDC_MINT;
export const PYTH_FEED = new PublicKey("2k1qZ9ZMNUNmpGghq6ZQRj7z2d2ATNnzzYugVhiTDCPn"); //BTC Pyth Feed


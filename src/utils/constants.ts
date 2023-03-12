import { PublicKey } from "@solana/web3.js";


export const CONTRACT_NAME = "v1_14/03/23_GVXRS";
export const WHIRLPOOL_KEY = new PublicKey("6ASLzoT1aQHANPcRHRJ1jq4xsWNWidSMd4SqBm8eoDLr"); 

export const VAYOO_CONTRACT_ID = new PublicKey('6ccnZSaDcMwKe1xwHbubs4q2GdPEr7hSK59A3GddJpte');
export const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
export const SUPER_USER_KEY = new PublicKey("4gNFEk4qvgxE6iM8ukfDUDaCT8itAeWXxURbnqNZXZXp");
export const COLLATERAL_MINT = USDC_MINT;
// export const PYTH_FEED = new PublicKey("2k1qZ9ZMNUNmpGghq6ZQRj7z2d2ATNnzzYugVhiTDCPn"); //SPY Pyth Feed
// export const PYTH_EXPONENT = 1e5;
export const PYTH_FEED = new PublicKey("GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU"); //BTC Pyth Feed
export const PYTH_EXPONENT = 1e8;

export const ADMIN_KEYS = ['CkvRjxTtotXBuYjBXVkcyDfd3qoEgeLnQecxFfPg1ZcN','4gNFEk4qvgxE6iM8ukfDUDaCT8itAeWXxURbnqNZXZXp'];
export const REFRESH_TIME_INTERVAL = 60_000;
export const TRADE_SLIPPAGE = 100; //10% percentage
// export const ASSET_LONG_NAME = "Equity.US.SPY/USD";
// export const ASSET_SHORT_NAME = "SPY";
// export const MARKET_NAME = "SPY/USD";
// export const ASSET_LINK = "https://pyth.network/price-feeds/equity-us-spy-usd?cluster=mainnet-beta"
export const ASSET_LONG_NAME = "Crypto.BTC/USD";
export const ASSET_SHORT_NAME = "BTC";
export const MARKET_NAME = "BTC/USD";
export const ASSET_LINK = "https://pyth.network/price-feeds/crypto-btc-usd?cluster=mainnet-beta"

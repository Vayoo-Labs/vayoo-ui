import { PublicKey } from "@solana/web3.js";

export const RPC = "https://api.metaplex.solana.com/";

export const VAYOO_CONTRACT_ID = new PublicKey('6ccnZSaDcMwKe1xwHbubs4q2GdPEr7hSK59A3GddJpte');
export const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
export const SUPER_USER_KEY = new PublicKey("4gNFEk4qvgxE6iM8ukfDUDaCT8itAeWXxURbnqNZXZXp");
export const COLLATERAL_MINT = USDC_MINT;

export const ADMIN_KEYS = ['CkvRjxTtotXBuYjBXVkcyDfd3qoEgeLnQecxFfPg1ZcN','4gNFEk4qvgxE6iM8ukfDUDaCT8itAeWXxURbnqNZXZXp'];
export const REFRESH_TIME_INTERVAL = 60_000;
export const TRADE_SLIPPAGE = 100; //10% percentage
export const ASSET_LONG_NAME = "Equity.US.SPY/USD";
export const ASSET_SHORT_NAME = "SPY";
export const MARKET_NAME = "SPY/USD";
export const ASSET_LINK = "https://pyth.network/price-feeds/equity-us-spy-usd?cluster=mainnet-beta"
// export const ASSET_LONG_NAME = "Crypto.BTC/USD";
// export const ASSET_SHORT_NAME = "BTC";
// export const MARKET_NAME = "BTC/USD";
// export const ASSET_LINK = "https://pyth.network/price-feeds/crypto-btc-usd?cluster=mainnet-beta"

export const USER_TRADE_CAP_USD = 200;

export const WHITELIST_USER_KEYS = [
    "4gNFEk4qvgxE6iM8ukfDUDaCT8itAeWXxURbnqNZXZXp", // adil admin
    "BGQDmkQDrxZjNiUHCsSZYuKP4XJMfoJ6AXtmJh7CaxLH", // adil user
    "CkvRjxTtotXBuYjBXVkcyDfd3qoEgeLnQecxFfPg1ZcN", // nico
    "6f3WCCWureFHhVqz8CqPYCoon6w41W6jbuy1vHrxwHL9", // abdu
    "Gc1sfSZZSJAWbS548jhqgLcxnZBbYqQygUdfQnGeP91r", // dr_obiocha
    "2bmaKmnsgVxCxNJioY9qer3L7aQZYFdZgmYPnxXVo4xJ", // King Smart
    "9Tftu1iJHwmth2QSp22QER4isFewT8RFK56tk79iJ3Ek", // Cyprian igbokwe
    "CfGQPM14E842FRzXtpiAeWuK9A4EbGTnbxmxFjWJPhJe", // rolllr
    "4dHx2N6SphSgJzJTDFi5NsyHr18tmgx7kohNYWQJsdVi", // goodtradez
    "9cxZRERzNtVyqrnz7mjGu19vRip2jX4shQtHMb1B69FQ", // pseudo
    "HKwoEwxAGd3KynUSi4UZzSHxYJd6sewYRV95ccsdjNwm", // abdulla
    "Bj7VYcA4TGpNpGxwoXLiixBEZSDmKUk5QrwYwddCx8Au", // HMS
    "2JXP6KUwPSmCrXT2uQRqSoCwH8RLYWwmqYsj3zXtv9xF", // ywy
]

export const CONTRACT_LIST = [
    {
        uiName: "SPX Monday 20th",
        name: "vv1_20/03_2k1qZ",
        whirlpoolKey: new PublicKey("8pBnB6BafUh3w69DD7YUC8ckvQ2MPB23dGy6r8HQWUks"),
        pythFeed: new PublicKey("2k1qZ9ZMNUNmpGghq6ZQRj7z2d2ATNnzzYugVhiTDCPn"),
        pythExponent: 1e5
    },
    // {
    //     uiName: "SPX Monday 20th",
    //     name: "v04_20/03_2k1qZ",
    //     whirlpoolKey: new PublicKey("6Sh1RDJaApNxc1DiLc5sgcrnBMzqgusg9htmWnhg5UHS"),
    //     pythFeed: new PublicKey("2k1qZ9ZMNUNmpGghq6ZQRj7z2d2ATNnzzYugVhiTDCPn"),
    //     pythExponent: 1e5
    // },
    {
        uiName: "SPX Friday 17th",
        name: "v4_17/03_2k1qZ",
        whirlpoolKey: new PublicKey("Bi4KRhxp8pvy1hfN3TDXfws5D7TYLZz8UyF8ThfrpmwD"),
        pythFeed: new PublicKey("2k1qZ9ZMNUNmpGghq6ZQRj7z2d2ATNnzzYugVhiTDCPn"),
        pythExponent: 1e5
    },
]
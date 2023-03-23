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

export const WHITELIST_USER_KEYS = [
    "4gNFEk4qvgxE6iM8ukfDUDaCT8itAeWXxURbnqNZXZXp", // adil admin
    "BGQDmkQDrxZjNiUHCsSZYuKP4XJMfoJ6AXtmJh7CaxLH", // adil user
    "FTgy1WK7zyrSMfjC8e81aGrStMs2J1yHFjCfLwc7j8BV", // adil user 2
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
    "8gYKYqBnS1f1Trvpir7m6Qy5SCePRXTyAX8gVqsQn5Zx", // Deleuze
    "Hzk1TLKzszo2dPtFDKcJ9wgw9NgBykYTxxjAgPB2Cp29", // Kristin
]
import { useEffect, useState } from "react";

import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider as ReactUIWalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  GlowWalletAdapter,
  BackpackWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { FC, ReactNode, useCallback, useMemo } from "react";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const endpointUrl = "https://api.metaplex.solana.com/";

  const { connection, config }: any = useMemo(() => {
    const url = new URL(endpointUrl);
    const hostURL = url.href.replace(`${url.username}:${url.password}@`, "");
    const headers: any = {};
    if (url.username) {
      headers["Authorization"] =
        "Basic " +
        Buffer.from(`${url.username}:${url.password}`).toString("base64");
    }
    return {
      connection: hostURL,
      config: {
        commitment: "confirmed",
        httpHeaders: headers,
        wsEndpoint: url.href.replace("https", "wss"),
      },
    };
  }, []);

  const wallets = [
    new SolflareWalletAdapter(),
    new GlowWalletAdapter(),
  ];

  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  return (
    <>
      {connection && (
        <ConnectionProvider endpoint={connection} config={config}>
          <WalletProvider wallets={wallets} onError={onError} autoConnect>
            <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      )}
    </>
  );
};

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <WalletContextProvider>{children}</WalletContextProvider>;
};

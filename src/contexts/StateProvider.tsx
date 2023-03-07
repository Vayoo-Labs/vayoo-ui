import { SignatureResult, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import React, { useEffect, useState } from "react";

import { getVayooProgramInstance, sleep } from "../utils";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

import { getUserStatePDA } from "../utils/vayoo-pda";
import { vayooState } from "../utils/types";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

interface VMStateConfig {
  state: vayooState;
  subscribeTx: (
    txHash: string,
    onTxSent?: any,
    onTxSuccess?: any,
    onTxFailed?: any
  ) => void;
  toggleRefresh: () => void;
  loading: boolean;
}

const VMStateContext = React.createContext<VMStateConfig>({
  state: null,
  subscribeTx: () => {},
  toggleRefresh: () => {},
  loading: false,
});

export function VMStateProvider({ children = undefined as any }) {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [state, setState] = useState<vayooState>(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const subscribeTx = async (
    txHash: string,
    onTxSent: any,
    onTxSuccess: any,
    onTxFailed: any
  ) => {
    if (txHash) {
      onTxSent();
      console.log("Sent tx: ", txHash);
    } else {
      onTxFailed();
      return;
    }
    // connection.confirmTransaction();
    connection.onSignature(
      txHash,
      async function (signatureResult: SignatureResult) {
        console.log("onProcessed");
        if (!signatureResult.err) {
          onTxSuccess();
        } else {
          onTxFailed();
        }
      },
      "processed"
    );
  };

  const updateState = async () => {
    const program = await getVayooProgramInstance(connection, wallet);
    let accounts: any = {
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
      tokenProgram: TOKEN_PROGRAM_ID
    }

    if (wallet?.connected) {
        const userStateKey = getUserStatePDA(wallet.publicKey!).pda;
        const userState = await program.account.userState.fetchNullable(userStateKey);
        
        setState((prev) => ({
            accounts: accounts,
            contractState: null,
            globalState: null,
            userState: userState,
            vayooProgram: program
        }))
        return
    }

    setState({
      vayooProgram: program,
      accounts: null,
      contractState: null,
      globalState: null,
      userState: null
    });
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      console.log("--updating state--");
      await updateState();
      console.log("--updated state--");
      setLoading(false);
    })();
  }, [connection, wallet, refresh]);

  return (
    <VMStateContext.Provider
      value={{
        state,
        subscribeTx,
        toggleRefresh: () => setRefresh(!refresh),
        loading,
      }}
    >
      {children}
    </VMStateContext.Provider>
  );
}

export function useVMState() {
  const context = React.useContext(VMStateContext);

  return { state: context.state, loading: context.loading };
}

export function useSubscribeTx() {
  const context = React.useContext(VMStateContext);

  return context.subscribeTx;
}

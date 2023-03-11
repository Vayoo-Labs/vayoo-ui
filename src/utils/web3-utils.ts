import { Connection, Keypair, PublicKey, Transaction, TransactionSignature } from "@solana/web3.js";

async function covertToProgramWalletTransaction(
    connection: Connection,
    wallet: any,
    transaction: Transaction,
    signers: Array<Keypair> = []
  ) {
    transaction.recentBlockhash = (await connection.getRecentBlockhash('processed')).blockhash;
    transaction.feePayer = wallet.publicKey;
    if (signers.length > 0) {
      transaction = await wallet.convertToProgramWalletTransaction(transaction);
      transaction.partialSign(...signers);
    }
    return transaction;
  }

  export async function sendTransaction(
    connection: Connection,
    wallet: any,
    transaction: Transaction,
    signers: Array<Keypair> = []
  ) {
    if (wallet.isProgramWallet) {
      const programWalletTransaction = await covertToProgramWalletTransaction(connection, wallet, transaction, signers);
      return await wallet.signAndSendTransaction(programWalletTransaction);
    } else {
      const signedTransaction = await signTransaction(connection, wallet, transaction, signers);
      return await sendSignedTransaction(connection, signedTransaction);
    }
  }

  async function signTransaction(
    connection: Connection,
    wallet: any,
    transaction: Transaction,
    signers: Array<Keypair> = []
  ) {
    transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    transaction.setSigners(wallet.publicKey, ...signers.map((s) => s.publicKey));
    if (signers.length > 0) {
      transaction.partialSign(...signers);
    }
    return await wallet.signTransaction(transaction);
  }

  export async function sendSignedTransaction(connection: Connection, signedTransaction: Transaction): Promise<string> {
    const rawTransaction = signedTransaction.serialize();
  
    const txid: TransactionSignature = await connection.sendRawTransaction(rawTransaction, {
      skipPreflight: true,
      preflightCommitment: 'processed',
    });
  
    return txid;
  }

  // Anchor Wallet Definition
export interface WalletOrca {
  signTransaction(tx: Transaction): Promise<Transaction>;
  signAllTransactions(txs: Transaction[]): Promise<Transaction[]>;
  publicKey: PublicKey;
}
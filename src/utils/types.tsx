import { AccountFetcher, Whirlpool, WhirlpoolData } from '@orca-so/whirlpools-sdk';
import * as anchor from '@project-serum/anchor';
import { IdlAccounts } from '@project-serum/anchor';
import { PriceData } from '@pythnetwork/client';
import { PublicKey } from '@solana/web3.js';
import { VayooContracts } from './vayoo_contracts';

export type vayooState = {
  vayooProgram: anchor.Program<VayooContracts>;
  globalState: IdlAccounts<VayooContracts>['globalState'] | null;
  contractState: IdlAccounts<VayooContracts>['contractState'] | null;
  userState: IdlAccounts<VayooContracts>['userState'] | null;
  userPosition: UserPosition;
  poolState: WhirlpoolData | null;
  whirlpool: Whirlpool | null;
  orcaFetcher: AccountFetcher | null;
  assetPrice: number;
  accounts: any;
} | null;

export enum UserPosition {
  Long,
  Short,
  Neutral,
  Mm
}

export type PositionAndStatsComponentParams = {
  userPosition: UserPosition
};

export type selectedContractData = {
  name: string,
  whirlpoolKey: PublicKey,
  oracleFeedType: number,
  oracleFeed: PublicKey,
  oracleExponent: number,
  extraInfo: any
} | null;

export type OracleData = {
  price: number,
  previousPrice: number
} | null;

export const OracleFeedType = {
  Pyth: 0,
  Switchboard: 1
}
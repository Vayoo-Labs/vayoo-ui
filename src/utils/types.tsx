import { AccountFetcher, Whirlpool, WhirlpoolData } from '@orca-so/whirlpools-sdk';
import * as anchor from '@project-serum/anchor';
import { IdlAccounts } from '@project-serum/anchor';
import { PriceData } from '@pythnetwork/client';
import { VayooContracts } from './vayoo_contracts';

export type vayooState = {
  vayooProgram: anchor.Program<VayooContracts>;
  globalState: IdlAccounts<VayooContracts>['globalState'] | null;
  contractState: IdlAccounts<VayooContracts>['contractState'] | null;
  userState: IdlAccounts<VayooContracts>['userState'] | null;
  poolState: WhirlpoolData | null;
  whirlpool: Whirlpool | null;
  orcaFetcher: AccountFetcher | null;
  pythData: PriceData;
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
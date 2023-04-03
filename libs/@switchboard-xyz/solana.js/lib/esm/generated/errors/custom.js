export class ArrayOperationError extends Error {
    constructor(logs) {
        super('6000: Illegal operation on a Switchboard array.');
        this.logs = logs;
        this.code = 6000;
        this.name = 'ArrayOperationError';
        this.msg = 'Illegal operation on a Switchboard array.';
    }
}
ArrayOperationError.code = 6000;
export class QueueOperationError extends Error {
    constructor(logs) {
        super('6001: Illegal operation on a Switchboard queue.');
        this.logs = logs;
        this.code = 6001;
        this.name = 'QueueOperationError';
        this.msg = 'Illegal operation on a Switchboard queue.';
    }
}
QueueOperationError.code = 6001;
export class IncorrectProgramOwnerError extends Error {
    constructor(logs) {
        super('6002: An account required to be owned by the program has a different owner.');
        this.logs = logs;
        this.code = 6002;
        this.name = 'IncorrectProgramOwnerError';
        this.msg = 'An account required to be owned by the program has a different owner.';
    }
}
IncorrectProgramOwnerError.code = 6002;
export class InvalidAggregatorRound extends Error {
    constructor(logs) {
        super('6003: Aggregator is not currently populated with a valid round.');
        this.logs = logs;
        this.code = 6003;
        this.name = 'InvalidAggregatorRound';
        this.msg = 'Aggregator is not currently populated with a valid round.';
    }
}
InvalidAggregatorRound.code = 6003;
export class TooManyAggregatorJobs extends Error {
    constructor(logs) {
        super('6004: Aggregator cannot fit any more jobs.');
        this.logs = logs;
        this.code = 6004;
        this.name = 'TooManyAggregatorJobs';
        this.msg = 'Aggregator cannot fit any more jobs.';
    }
}
TooManyAggregatorJobs.code = 6004;
export class AggregatorCurrentRoundClosed extends Error {
    constructor(logs) {
        super("6005: Aggregator's current round is closed. No results are being accepted.");
        this.logs = logs;
        this.code = 6005;
        this.name = 'AggregatorCurrentRoundClosed';
        this.msg = "Aggregator's current round is closed. No results are being accepted.";
    }
}
AggregatorCurrentRoundClosed.code = 6005;
export class AggregatorInvalidSaveResult extends Error {
    constructor(logs) {
        super('6006: Aggregator received an invalid save result instruction.');
        this.logs = logs;
        this.code = 6006;
        this.name = 'AggregatorInvalidSaveResult';
        this.msg = 'Aggregator received an invalid save result instruction.';
    }
}
AggregatorInvalidSaveResult.code = 6006;
export class InvalidStrDecimalConversion extends Error {
    constructor(logs) {
        super('6007: Failed to convert string to decimal format.');
        this.logs = logs;
        this.code = 6007;
        this.name = 'InvalidStrDecimalConversion';
        this.msg = 'Failed to convert string to decimal format.';
    }
}
InvalidStrDecimalConversion.code = 6007;
export class AccountLoaderMissingSignature extends Error {
    constructor(logs) {
        super('6008: AccountLoader account is missing a required signature.');
        this.logs = logs;
        this.code = 6008;
        this.name = 'AccountLoaderMissingSignature';
        this.msg = 'AccountLoader account is missing a required signature.';
    }
}
AccountLoaderMissingSignature.code = 6008;
export class MissingRequiredSignature extends Error {
    constructor(logs) {
        super('6009: Account is missing a required signature.');
        this.logs = logs;
        this.code = 6009;
        this.name = 'MissingRequiredSignature';
        this.msg = 'Account is missing a required signature.';
    }
}
MissingRequiredSignature.code = 6009;
export class ArrayOverflowError extends Error {
    constructor(logs) {
        super('6010: The attempted action will overflow a zero-copy account array.');
        this.logs = logs;
        this.code = 6010;
        this.name = 'ArrayOverflowError';
        this.msg = 'The attempted action will overflow a zero-copy account array.';
    }
}
ArrayOverflowError.code = 6010;
export class ArrayUnderflowError extends Error {
    constructor(logs) {
        super('6011: The attempted action will underflow a zero-copy account array.');
        this.logs = logs;
        this.code = 6011;
        this.name = 'ArrayUnderflowError';
        this.msg = 'The attempted action will underflow a zero-copy account array.';
    }
}
ArrayUnderflowError.code = 6011;
export class PubkeyNotFoundError extends Error {
    constructor(logs) {
        super('6012: The queried public key was not found.');
        this.logs = logs;
        this.code = 6012;
        this.name = 'PubkeyNotFoundError';
        this.msg = 'The queried public key was not found.';
    }
}
PubkeyNotFoundError.code = 6012;
export class AggregatorIllegalRoundOpenCall extends Error {
    constructor(logs) {
        super('6013: Aggregator round open called too early.');
        this.logs = logs;
        this.code = 6013;
        this.name = 'AggregatorIllegalRoundOpenCall';
        this.msg = 'Aggregator round open called too early.';
    }
}
AggregatorIllegalRoundOpenCall.code = 6013;
export class AggregatorIllegalRoundCloseCall extends Error {
    constructor(logs) {
        super('6014: Aggregator round close called too early.');
        this.logs = logs;
        this.code = 6014;
        this.name = 'AggregatorIllegalRoundCloseCall';
        this.msg = 'Aggregator round close called too early.';
    }
}
AggregatorIllegalRoundCloseCall.code = 6014;
export class AggregatorClosedError extends Error {
    constructor(logs) {
        super('6015: Aggregator is closed. Illegal action.');
        this.logs = logs;
        this.code = 6015;
        this.name = 'AggregatorClosedError';
        this.msg = 'Aggregator is closed. Illegal action.';
    }
}
AggregatorClosedError.code = 6015;
export class IllegalOracleIdxError extends Error {
    constructor(logs) {
        super('6016: Illegal oracle index.');
        this.logs = logs;
        this.code = 6016;
        this.name = 'IllegalOracleIdxError';
        this.msg = 'Illegal oracle index.';
    }
}
IllegalOracleIdxError.code = 6016;
export class OracleAlreadyRespondedError extends Error {
    constructor(logs) {
        super('6017: The provided oracle has already responded this round.');
        this.logs = logs;
        this.code = 6017;
        this.name = 'OracleAlreadyRespondedError';
        this.msg = 'The provided oracle has already responded this round.';
    }
}
OracleAlreadyRespondedError.code = 6017;
export class ProtoDeserializeError extends Error {
    constructor(logs) {
        super('6018: Failed to deserialize protocol buffer.');
        this.logs = logs;
        this.code = 6018;
        this.name = 'ProtoDeserializeError';
        this.msg = 'Failed to deserialize protocol buffer.';
    }
}
ProtoDeserializeError.code = 6018;
export class UnauthorizedStateUpdateError extends Error {
    constructor(logs) {
        super('6019: Unauthorized program state modification attempted.');
        this.logs = logs;
        this.code = 6019;
        this.name = 'UnauthorizedStateUpdateError';
        this.msg = 'Unauthorized program state modification attempted.';
    }
}
UnauthorizedStateUpdateError.code = 6019;
export class MissingOracleAccountsError extends Error {
    constructor(logs) {
        super('6020: Not enough oracle accounts provided to closeRounds.');
        this.logs = logs;
        this.code = 6020;
        this.name = 'MissingOracleAccountsError';
        this.msg = 'Not enough oracle accounts provided to closeRounds.';
    }
}
MissingOracleAccountsError.code = 6020;
export class OracleMismatchError extends Error {
    constructor(logs) {
        super('6021: An unexpected oracle account was provided for the transaction.');
        this.logs = logs;
        this.code = 6021;
        this.name = 'OracleMismatchError';
        this.msg = 'An unexpected oracle account was provided for the transaction.';
    }
}
OracleMismatchError.code = 6021;
export class CrankMaxCapacityError extends Error {
    constructor(logs) {
        super("6022: Attempted to push to a Crank that's at capacity");
        this.logs = logs;
        this.code = 6022;
        this.name = 'CrankMaxCapacityError';
        this.msg = "Attempted to push to a Crank that's at capacity";
    }
}
CrankMaxCapacityError.code = 6022;
export class AggregatorLeaseInsufficientFunds extends Error {
    constructor(logs) {
        super('6023: Aggregator update call attempted but attached lease has insufficient funds.');
        this.logs = logs;
        this.code = 6023;
        this.name = 'AggregatorLeaseInsufficientFunds';
        this.msg = 'Aggregator update call attempted but attached lease has insufficient funds.';
    }
}
AggregatorLeaseInsufficientFunds.code = 6023;
export class IncorrectTokenAccountMint extends Error {
    constructor(logs) {
        super('6024: The provided token account does not point to the Switchboard token mint.');
        this.logs = logs;
        this.code = 6024;
        this.name = 'IncorrectTokenAccountMint';
        this.msg = 'The provided token account does not point to the Switchboard token mint.';
    }
}
IncorrectTokenAccountMint.code = 6024;
export class InvalidEscrowAccount extends Error {
    constructor(logs) {
        super('6025: An invalid escrow account was provided.');
        this.logs = logs;
        this.code = 6025;
        this.name = 'InvalidEscrowAccount';
        this.msg = 'An invalid escrow account was provided.';
    }
}
InvalidEscrowAccount.code = 6025;
export class CrankEmptyError extends Error {
    constructor(logs) {
        super('6026: Crank empty. Pop failed.');
        this.logs = logs;
        this.code = 6026;
        this.name = 'CrankEmptyError';
        this.msg = 'Crank empty. Pop failed.';
    }
}
CrankEmptyError.code = 6026;
export class PdaDeriveError extends Error {
    constructor(logs) {
        super('6027: Failed to derive a PDA from the provided seed.');
        this.logs = logs;
        this.code = 6027;
        this.name = 'PdaDeriveError';
        this.msg = 'Failed to derive a PDA from the provided seed.';
    }
}
PdaDeriveError.code = 6027;
export class AggregatorAccountNotFound extends Error {
    constructor(logs) {
        super('6028: Aggregator account missing from provided account list.');
        this.logs = logs;
        this.code = 6028;
        this.name = 'AggregatorAccountNotFound';
        this.msg = 'Aggregator account missing from provided account list.';
    }
}
AggregatorAccountNotFound.code = 6028;
export class PermissionAccountNotFound extends Error {
    constructor(logs) {
        super('6029: Permission account missing from provided account list.');
        this.logs = logs;
        this.code = 6029;
        this.name = 'PermissionAccountNotFound';
        this.msg = 'Permission account missing from provided account list.';
    }
}
PermissionAccountNotFound.code = 6029;
export class LeaseAccountDeriveFailure extends Error {
    constructor(logs) {
        super('6030: Failed to derive a lease account.');
        this.logs = logs;
        this.code = 6030;
        this.name = 'LeaseAccountDeriveFailure';
        this.msg = 'Failed to derive a lease account.';
    }
}
LeaseAccountDeriveFailure.code = 6030;
export class PermissionAccountDeriveFailure extends Error {
    constructor(logs) {
        super('6031: Failed to derive a permission account.');
        this.logs = logs;
        this.code = 6031;
        this.name = 'PermissionAccountDeriveFailure';
        this.msg = 'Failed to derive a permission account.';
    }
}
PermissionAccountDeriveFailure.code = 6031;
export class EscrowAccountNotFound extends Error {
    constructor(logs) {
        super('6032: Escrow account missing from provided account list.');
        this.logs = logs;
        this.code = 6032;
        this.name = 'EscrowAccountNotFound';
        this.msg = 'Escrow account missing from provided account list.';
    }
}
EscrowAccountNotFound.code = 6032;
export class LeaseAccountNotFound extends Error {
    constructor(logs) {
        super('6033: Lease account missing from provided account list.');
        this.logs = logs;
        this.code = 6033;
        this.name = 'LeaseAccountNotFound';
        this.msg = 'Lease account missing from provided account list.';
    }
}
LeaseAccountNotFound.code = 6033;
export class DecimalConversionError extends Error {
    constructor(logs) {
        super('6034: Decimal conversion method failed.');
        this.logs = logs;
        this.code = 6034;
        this.name = 'DecimalConversionError';
        this.msg = 'Decimal conversion method failed.';
    }
}
DecimalConversionError.code = 6034;
export class PermissionDenied extends Error {
    constructor(logs) {
        super('6035: Permission account is missing required flags for the given action.');
        this.logs = logs;
        this.code = 6035;
        this.name = 'PermissionDenied';
        this.msg = 'Permission account is missing required flags for the given action.';
    }
}
PermissionDenied.code = 6035;
export class QueueAtCapacity extends Error {
    constructor(logs) {
        super('6036: Oracle queue is at lease capacity.');
        this.logs = logs;
        this.code = 6036;
        this.name = 'QueueAtCapacity';
        this.msg = 'Oracle queue is at lease capacity.';
    }
}
QueueAtCapacity.code = 6036;
export class ExcessiveCrankRowsError extends Error {
    constructor(logs) {
        super('6037: Data feed is already pushed on a crank.');
        this.logs = logs;
        this.code = 6037;
        this.name = 'ExcessiveCrankRowsError';
        this.msg = 'Data feed is already pushed on a crank.';
    }
}
ExcessiveCrankRowsError.code = 6037;
export class AggregatorLockedError extends Error {
    constructor(logs) {
        super('6038: Aggregator is locked, no setting modifications or job additions allowed.');
        this.logs = logs;
        this.code = 6038;
        this.name = 'AggregatorLockedError';
        this.msg = 'Aggregator is locked, no setting modifications or job additions allowed.';
    }
}
AggregatorLockedError.code = 6038;
export class AggregatorInvalidBatchSizeError extends Error {
    constructor(logs) {
        super('6039: Aggregator invalid batch size.');
        this.logs = logs;
        this.code = 6039;
        this.name = 'AggregatorInvalidBatchSizeError';
        this.msg = 'Aggregator invalid batch size.';
    }
}
AggregatorInvalidBatchSizeError.code = 6039;
export class AggregatorJobChecksumMismatch extends Error {
    constructor(logs) {
        super('6040: Oracle provided an incorrect aggregator job checksum.');
        this.logs = logs;
        this.code = 6040;
        this.name = 'AggregatorJobChecksumMismatch';
        this.msg = 'Oracle provided an incorrect aggregator job checksum.';
    }
}
AggregatorJobChecksumMismatch.code = 6040;
export class IntegerOverflowError extends Error {
    constructor(logs) {
        super('6041: An integer overflow occurred.');
        this.logs = logs;
        this.code = 6041;
        this.name = 'IntegerOverflowError';
        this.msg = 'An integer overflow occurred.';
    }
}
IntegerOverflowError.code = 6041;
export class InvalidUpdatePeriodError extends Error {
    constructor(logs) {
        super('6042: Minimum update period is 5 seconds.');
        this.logs = logs;
        this.code = 6042;
        this.name = 'InvalidUpdatePeriodError';
        this.msg = 'Minimum update period is 5 seconds.';
    }
}
InvalidUpdatePeriodError.code = 6042;
export class NoResultsError extends Error {
    constructor(logs) {
        super('6043: Aggregator round evaluation attempted with no results.');
        this.logs = logs;
        this.code = 6043;
        this.name = 'NoResultsError';
        this.msg = 'Aggregator round evaluation attempted with no results.';
    }
}
NoResultsError.code = 6043;
export class InvalidExpirationError extends Error {
    constructor(logs) {
        super('6044: An expiration constraint was broken.');
        this.logs = logs;
        this.code = 6044;
        this.name = 'InvalidExpirationError';
        this.msg = 'An expiration constraint was broken.';
    }
}
InvalidExpirationError.code = 6044;
export class InsufficientStakeError extends Error {
    constructor(logs) {
        super('6045: An account provided insufficient stake for action.');
        this.logs = logs;
        this.code = 6045;
        this.name = 'InsufficientStakeError';
        this.msg = 'An account provided insufficient stake for action.';
    }
}
InsufficientStakeError.code = 6045;
export class LeaseInactiveError extends Error {
    constructor(logs) {
        super('6046: The provided lease account is not active.');
        this.logs = logs;
        this.code = 6046;
        this.name = 'LeaseInactiveError';
        this.msg = 'The provided lease account is not active.';
    }
}
LeaseInactiveError.code = 6046;
export class NoAggregatorJobsFound extends Error {
    constructor(logs) {
        super('6047: No jobs are currently included in the aggregator.');
        this.logs = logs;
        this.code = 6047;
        this.name = 'NoAggregatorJobsFound';
        this.msg = 'No jobs are currently included in the aggregator.';
    }
}
NoAggregatorJobsFound.code = 6047;
export class IntegerUnderflowError extends Error {
    constructor(logs) {
        super('6048: An integer underflow occurred.');
        this.logs = logs;
        this.code = 6048;
        this.name = 'IntegerUnderflowError';
        this.msg = 'An integer underflow occurred.';
    }
}
IntegerUnderflowError.code = 6048;
export class OracleQueueMismatch extends Error {
    constructor(logs) {
        super('6049: An invalid oracle queue account was provided.');
        this.logs = logs;
        this.code = 6049;
        this.name = 'OracleQueueMismatch';
        this.msg = 'An invalid oracle queue account was provided.';
    }
}
OracleQueueMismatch.code = 6049;
export class OracleWalletMismatchError extends Error {
    constructor(logs) {
        super('6050: An unexpected oracle wallet account was provided for the transaction.');
        this.logs = logs;
        this.code = 6050;
        this.name = 'OracleWalletMismatchError';
        this.msg = 'An unexpected oracle wallet account was provided for the transaction.';
    }
}
OracleWalletMismatchError.code = 6050;
export class InvalidBufferAccountError extends Error {
    constructor(logs) {
        super('6051: An invalid buffer account was provided.');
        this.logs = logs;
        this.code = 6051;
        this.name = 'InvalidBufferAccountError';
        this.msg = 'An invalid buffer account was provided.';
    }
}
InvalidBufferAccountError.code = 6051;
export class InsufficientOracleQueueError extends Error {
    constructor(logs) {
        super('6052: Insufficient oracle queue size.');
        this.logs = logs;
        this.code = 6052;
        this.name = 'InsufficientOracleQueueError';
        this.msg = 'Insufficient oracle queue size.';
    }
}
InsufficientOracleQueueError.code = 6052;
export class InvalidAuthorityError extends Error {
    constructor(logs) {
        super('6053: Invalid authority account provided.');
        this.logs = logs;
        this.code = 6053;
        this.name = 'InvalidAuthorityError';
        this.msg = 'Invalid authority account provided.';
    }
}
InvalidAuthorityError.code = 6053;
export class InvalidTokenAccountMintError extends Error {
    constructor(logs) {
        super('6054: A provided token wallet is associated with an incorrect mint.');
        this.logs = logs;
        this.code = 6054;
        this.name = 'InvalidTokenAccountMintError';
        this.msg = 'A provided token wallet is associated with an incorrect mint.';
    }
}
InvalidTokenAccountMintError.code = 6054;
export class ExcessiveLeaseWithdrawlError extends Error {
    constructor(logs) {
        super('6055: You must leave enough funds to perform at least 1 update in the lease.');
        this.logs = logs;
        this.code = 6055;
        this.name = 'ExcessiveLeaseWithdrawlError';
        this.msg = 'You must leave enough funds to perform at least 1 update in the lease.';
    }
}
ExcessiveLeaseWithdrawlError.code = 6055;
export class InvalideHistoryAccountError extends Error {
    constructor(logs) {
        super('6056: Invalid history account provided.');
        this.logs = logs;
        this.code = 6056;
        this.name = 'InvalideHistoryAccountError';
        this.msg = 'Invalid history account provided.';
    }
}
InvalideHistoryAccountError.code = 6056;
export class InvalidLeaseAccountEscrowError extends Error {
    constructor(logs) {
        super('6057: Invalid lease account escrow.');
        this.logs = logs;
        this.code = 6057;
        this.name = 'InvalidLeaseAccountEscrowError';
        this.msg = 'Invalid lease account escrow.';
    }
}
InvalidLeaseAccountEscrowError.code = 6057;
export class InvalidCrankAccountError extends Error {
    constructor(logs) {
        super('6058: Invalid crank provided.');
        this.logs = logs;
        this.code = 6058;
        this.name = 'InvalidCrankAccountError';
        this.msg = 'Invalid crank provided.';
    }
}
InvalidCrankAccountError.code = 6058;
export class CrankNoElementsReadyError extends Error {
    constructor(logs) {
        super('6059: No elements ready to be popped.');
        this.logs = logs;
        this.code = 6059;
        this.name = 'CrankNoElementsReadyError';
        this.msg = 'No elements ready to be popped.';
    }
}
CrankNoElementsReadyError.code = 6059;
export class IndexOutOfBoundsError extends Error {
    constructor(logs) {
        super('6060: Index out of bounds');
        this.logs = logs;
        this.code = 6060;
        this.name = 'IndexOutOfBoundsError';
        this.msg = 'Index out of bounds';
    }
}
IndexOutOfBoundsError.code = 6060;
export class VrfInvalidRequestError extends Error {
    constructor(logs) {
        super('6061: Invalid vrf request params');
        this.logs = logs;
        this.code = 6061;
        this.name = 'VrfInvalidRequestError';
        this.msg = 'Invalid vrf request params';
    }
}
VrfInvalidRequestError.code = 6061;
export class VrfInvalidProofSubmissionError extends Error {
    constructor(logs) {
        super('6062: Vrf proof failed to verify');
        this.logs = logs;
        this.code = 6062;
        this.name = 'VrfInvalidProofSubmissionError';
        this.msg = 'Vrf proof failed to verify';
    }
}
VrfInvalidProofSubmissionError.code = 6062;
export class VrfVerifyError extends Error {
    constructor(logs) {
        super('6063: Error in verifying vrf proof.');
        this.logs = logs;
        this.code = 6063;
        this.name = 'VrfVerifyError';
        this.msg = 'Error in verifying vrf proof.';
    }
}
VrfVerifyError.code = 6063;
export class VrfCallbackError extends Error {
    constructor(logs) {
        super('6064: Vrf callback function failed.');
        this.logs = logs;
        this.code = 6064;
        this.name = 'VrfCallbackError';
        this.msg = 'Vrf callback function failed.';
    }
}
VrfCallbackError.code = 6064;
export class VrfCallbackParamsError extends Error {
    constructor(logs) {
        super('6065: Invalid vrf callback params provided.');
        this.logs = logs;
        this.code = 6065;
        this.name = 'VrfCallbackParamsError';
        this.msg = 'Invalid vrf callback params provided.';
    }
}
VrfCallbackParamsError.code = 6065;
export class VrfCallbackAlreadyCalledError extends Error {
    constructor(logs) {
        super('6066: Vrf callback has already been triggered.');
        this.logs = logs;
        this.code = 6066;
        this.name = 'VrfCallbackAlreadyCalledError';
        this.msg = 'Vrf callback has already been triggered.';
    }
}
VrfCallbackAlreadyCalledError.code = 6066;
export class VrfInvalidPubkeyError extends Error {
    constructor(logs) {
        super('6067: The provided pubkey is invalid to use in ecvrf proofs');
        this.logs = logs;
        this.code = 6067;
        this.name = 'VrfInvalidPubkeyError';
        this.msg = 'The provided pubkey is invalid to use in ecvrf proofs';
    }
}
VrfInvalidPubkeyError.code = 6067;
export class VrfTooManyVerifyCallsError extends Error {
    constructor(logs) {
        super('6068: Number of required verify calls exceeded');
        this.logs = logs;
        this.code = 6068;
        this.name = 'VrfTooManyVerifyCallsError';
        this.msg = 'Number of required verify calls exceeded';
    }
}
VrfTooManyVerifyCallsError.code = 6068;
export class VrfRequestAlreadyLaunchedError extends Error {
    constructor(logs) {
        super('6069: Vrf request is already pending');
        this.logs = logs;
        this.code = 6069;
        this.name = 'VrfRequestAlreadyLaunchedError';
        this.msg = 'Vrf request is already pending';
    }
}
VrfRequestAlreadyLaunchedError.code = 6069;
export class VrfInsufficientVerificationError extends Error {
    constructor(logs) {
        super('6070: Insufficient amount of proofs collected for VRF callback');
        this.logs = logs;
        this.code = 6070;
        this.name = 'VrfInsufficientVerificationError';
        this.msg = 'Insufficient amount of proofs collected for VRF callback';
    }
}
VrfInsufficientVerificationError.code = 6070;
export class InvalidVrfProducerError extends Error {
    constructor(logs) {
        super('6071: An incorrect oracle attempted to submit a proof');
        this.logs = logs;
        this.code = 6071;
        this.name = 'InvalidVrfProducerError';
        this.msg = 'An incorrect oracle attempted to submit a proof';
    }
}
InvalidVrfProducerError.code = 6071;
export class InvalidGovernancePidError extends Error {
    constructor(logs) {
        super('6072: Invalid SPLGovernance Account Supplied');
        this.logs = logs;
        this.code = 6072;
        this.name = 'InvalidGovernancePidError';
        this.msg = 'Invalid SPLGovernance Account Supplied';
    }
}
InvalidGovernancePidError.code = 6072;
export class InvalidGovernanceAccountError extends Error {
    constructor(logs) {
        super('6073: An Invalid Governance Account was supplied');
        this.logs = logs;
        this.code = 6073;
        this.name = 'InvalidGovernanceAccountError';
        this.msg = 'An Invalid Governance Account was supplied';
    }
}
InvalidGovernanceAccountError.code = 6073;
export class MissingOptionalAccount extends Error {
    constructor(logs) {
        super('6074: Expected an optional account');
        this.logs = logs;
        this.code = 6074;
        this.name = 'MissingOptionalAccount';
        this.msg = 'Expected an optional account';
    }
}
MissingOptionalAccount.code = 6074;
export class InvalidSpawnRecordOwner extends Error {
    constructor(logs) {
        super('6075: Invalid Owner for Spawn Record');
        this.logs = logs;
        this.code = 6075;
        this.name = 'InvalidSpawnRecordOwner';
        this.msg = 'Invalid Owner for Spawn Record';
    }
}
InvalidSpawnRecordOwner.code = 6075;
export class NoopError extends Error {
    constructor(logs) {
        super('6076: Noop error');
        this.logs = logs;
        this.code = 6076;
        this.name = 'NoopError';
        this.msg = 'Noop error';
    }
}
NoopError.code = 6076;
export class MissingRequiredAccountsError extends Error {
    constructor(logs) {
        super('6077: A required instruction account was not included');
        this.logs = logs;
        this.code = 6077;
        this.name = 'MissingRequiredAccountsError';
        this.msg = 'A required instruction account was not included';
    }
}
MissingRequiredAccountsError.code = 6077;
export class InvalidMintError extends Error {
    constructor(logs) {
        super('6078: Invalid mint account passed for instruction');
        this.logs = logs;
        this.code = 6078;
        this.name = 'InvalidMintError';
        this.msg = 'Invalid mint account passed for instruction';
    }
}
InvalidMintError.code = 6078;
export class InvalidTokenAccountKeyError extends Error {
    constructor(logs) {
        super('6079: An invalid token account was passed into the instruction');
        this.logs = logs;
        this.code = 6079;
        this.name = 'InvalidTokenAccountKeyError';
        this.msg = 'An invalid token account was passed into the instruction';
    }
}
InvalidTokenAccountKeyError.code = 6079;
export class InvalidJobAccountError extends Error {
    constructor(logs) {
        super('6080: ');
        this.logs = logs;
        this.code = 6080;
        this.name = 'InvalidJobAccountError';
    }
}
InvalidJobAccountError.code = 6080;
export class VoterStakeRegistryError extends Error {
    constructor(logs) {
        super('6081: ');
        this.logs = logs;
        this.code = 6081;
        this.name = 'VoterStakeRegistryError';
    }
}
VoterStakeRegistryError.code = 6081;
export class AccountDiscriminatorMismatch extends Error {
    constructor(logs) {
        super('6082: Account discriminator did not match.');
        this.logs = logs;
        this.code = 6082;
        this.name = 'AccountDiscriminatorMismatch';
        this.msg = 'Account discriminator did not match.';
    }
}
AccountDiscriminatorMismatch.code = 6082;
export class FuckingImpossibleError extends Error {
    constructor(logs) {
        super('6083: This error is fucking impossible.');
        this.logs = logs;
        this.code = 6083;
        this.name = 'FuckingImpossibleError';
        this.msg = 'This error is fucking impossible.';
    }
}
FuckingImpossibleError.code = 6083;
export class InvalidVrfRound extends Error {
    constructor(logs) {
        super('6084: Responding to the wrong VRF round');
        this.logs = logs;
        this.code = 6084;
        this.name = 'InvalidVrfRound';
        this.msg = 'Responding to the wrong VRF round';
    }
}
InvalidVrfRound.code = 6084;
export class JobSizeExceeded extends Error {
    constructor(logs) {
        super('6085: Job size has exceeded the max of 6400 bytes');
        this.logs = logs;
        this.code = 6085;
        this.name = 'JobSizeExceeded';
        this.msg = 'Job size has exceeded the max of 6400 bytes';
    }
}
JobSizeExceeded.code = 6085;
export class JobChunksExceeded extends Error {
    constructor(logs) {
        super('6086: Job loading can only support a maximum of 8 chunks');
        this.logs = logs;
        this.code = 6086;
        this.name = 'JobChunksExceeded';
        this.msg = 'Job loading can only support a maximum of 8 chunks';
    }
}
JobChunksExceeded.code = 6086;
export class JobDataLocked extends Error {
    constructor(logs) {
        super('6087: Job has finished initializing and is immutable');
        this.logs = logs;
        this.code = 6087;
        this.name = 'JobDataLocked';
        this.msg = 'Job has finished initializing and is immutable';
    }
}
JobDataLocked.code = 6087;
export class JobNotInitialized extends Error {
    constructor(logs) {
        super('6088: Job account has not finished initializing');
        this.logs = logs;
        this.code = 6088;
        this.name = 'JobNotInitialized';
        this.msg = 'Job account has not finished initializing';
    }
}
JobNotInitialized.code = 6088;
export class BufferRelayerIllegalRoundOpenCall extends Error {
    constructor(logs) {
        super('6089: BufferRelayer round open called too early.');
        this.logs = logs;
        this.code = 6089;
        this.name = 'BufferRelayerIllegalRoundOpenCall';
        this.msg = 'BufferRelayer round open called too early.';
    }
}
BufferRelayerIllegalRoundOpenCall.code = 6089;
export class InvalidSliderAccount extends Error {
    constructor(logs) {
        super('6090: Invalid slider account.');
        this.logs = logs;
        this.code = 6090;
        this.name = 'InvalidSliderAccount';
        this.msg = 'Invalid slider account.';
    }
}
InvalidSliderAccount.code = 6090;
export class VrfLiteHasExistingPool extends Error {
    constructor(logs) {
        super('6091: VRF lite account belongs to an existing pool.');
        this.logs = logs;
        this.code = 6091;
        this.name = 'VrfLiteHasExistingPool';
        this.msg = 'VRF lite account belongs to an existing pool.';
    }
}
VrfLiteHasExistingPool.code = 6091;
export class VrfPoolFull extends Error {
    constructor(logs) {
        super('6092: VRF pool is at max capacity.');
        this.logs = logs;
        this.code = 6092;
        this.name = 'VrfPoolFull';
        this.msg = 'VRF pool is at max capacity.';
    }
}
VrfPoolFull.code = 6092;
export class VrfPoolEmpty extends Error {
    constructor(logs) {
        super('6093: VRF pool is empty.');
        this.logs = logs;
        this.code = 6093;
        this.name = 'VrfPoolEmpty';
        this.msg = 'VRF pool is empty.';
    }
}
VrfPoolEmpty.code = 6093;
export class VrfAccountNotFound extends Error {
    constructor(logs) {
        super('6094: Failed to find VRF account in remaining accounts array.');
        this.logs = logs;
        this.code = 6094;
        this.name = 'VrfAccountNotFound';
        this.msg = 'Failed to find VRF account in remaining accounts array.';
    }
}
VrfAccountNotFound.code = 6094;
export class AccountCloseNotReady extends Error {
    constructor(logs) {
        super('6095: Account is not ready to be closed.');
        this.logs = logs;
        this.code = 6095;
        this.name = 'AccountCloseNotReady';
        this.msg = 'Account is not ready to be closed.';
    }
}
AccountCloseNotReady.code = 6095;
export class VrfPoolRequestTooSoon extends Error {
    constructor(logs) {
        super('6096: VRF requested too soon.');
        this.logs = logs;
        this.code = 6096;
        this.name = 'VrfPoolRequestTooSoon';
        this.msg = 'VRF requested too soon.';
    }
}
VrfPoolRequestTooSoon.code = 6096;
export class VrfPoolMiss extends Error {
    constructor(logs) {
        super('6097: VRF pool miss.');
        this.logs = logs;
        this.code = 6097;
        this.name = 'VrfPoolMiss';
        this.msg = 'VRF pool miss.';
    }
}
VrfPoolMiss.code = 6097;
export class VrfLiteOwnedByPool extends Error {
    constructor(logs) {
        super('6098: VRF lite belongs to a pool.');
        this.logs = logs;
        this.code = 6098;
        this.name = 'VrfLiteOwnedByPool';
        this.msg = 'VRF lite belongs to a pool.';
    }
}
VrfLiteOwnedByPool.code = 6098;
export class InsufficientTokenBalance extends Error {
    constructor(logs) {
        super('6099: Escrow has insufficient funds to perform this action.');
        this.logs = logs;
        this.code = 6099;
        this.name = 'InsufficientTokenBalance';
        this.msg = 'Escrow has insufficient funds to perform this action.';
    }
}
InsufficientTokenBalance.code = 6099;
export function fromCode(code, logs) {
    switch (code) {
        case 6000:
            return new ArrayOperationError(logs);
        case 6001:
            return new QueueOperationError(logs);
        case 6002:
            return new IncorrectProgramOwnerError(logs);
        case 6003:
            return new InvalidAggregatorRound(logs);
        case 6004:
            return new TooManyAggregatorJobs(logs);
        case 6005:
            return new AggregatorCurrentRoundClosed(logs);
        case 6006:
            return new AggregatorInvalidSaveResult(logs);
        case 6007:
            return new InvalidStrDecimalConversion(logs);
        case 6008:
            return new AccountLoaderMissingSignature(logs);
        case 6009:
            return new MissingRequiredSignature(logs);
        case 6010:
            return new ArrayOverflowError(logs);
        case 6011:
            return new ArrayUnderflowError(logs);
        case 6012:
            return new PubkeyNotFoundError(logs);
        case 6013:
            return new AggregatorIllegalRoundOpenCall(logs);
        case 6014:
            return new AggregatorIllegalRoundCloseCall(logs);
        case 6015:
            return new AggregatorClosedError(logs);
        case 6016:
            return new IllegalOracleIdxError(logs);
        case 6017:
            return new OracleAlreadyRespondedError(logs);
        case 6018:
            return new ProtoDeserializeError(logs);
        case 6019:
            return new UnauthorizedStateUpdateError(logs);
        case 6020:
            return new MissingOracleAccountsError(logs);
        case 6021:
            return new OracleMismatchError(logs);
        case 6022:
            return new CrankMaxCapacityError(logs);
        case 6023:
            return new AggregatorLeaseInsufficientFunds(logs);
        case 6024:
            return new IncorrectTokenAccountMint(logs);
        case 6025:
            return new InvalidEscrowAccount(logs);
        case 6026:
            return new CrankEmptyError(logs);
        case 6027:
            return new PdaDeriveError(logs);
        case 6028:
            return new AggregatorAccountNotFound(logs);
        case 6029:
            return new PermissionAccountNotFound(logs);
        case 6030:
            return new LeaseAccountDeriveFailure(logs);
        case 6031:
            return new PermissionAccountDeriveFailure(logs);
        case 6032:
            return new EscrowAccountNotFound(logs);
        case 6033:
            return new LeaseAccountNotFound(logs);
        case 6034:
            return new DecimalConversionError(logs);
        case 6035:
            return new PermissionDenied(logs);
        case 6036:
            return new QueueAtCapacity(logs);
        case 6037:
            return new ExcessiveCrankRowsError(logs);
        case 6038:
            return new AggregatorLockedError(logs);
        case 6039:
            return new AggregatorInvalidBatchSizeError(logs);
        case 6040:
            return new AggregatorJobChecksumMismatch(logs);
        case 6041:
            return new IntegerOverflowError(logs);
        case 6042:
            return new InvalidUpdatePeriodError(logs);
        case 6043:
            return new NoResultsError(logs);
        case 6044:
            return new InvalidExpirationError(logs);
        case 6045:
            return new InsufficientStakeError(logs);
        case 6046:
            return new LeaseInactiveError(logs);
        case 6047:
            return new NoAggregatorJobsFound(logs);
        case 6048:
            return new IntegerUnderflowError(logs);
        case 6049:
            return new OracleQueueMismatch(logs);
        case 6050:
            return new OracleWalletMismatchError(logs);
        case 6051:
            return new InvalidBufferAccountError(logs);
        case 6052:
            return new InsufficientOracleQueueError(logs);
        case 6053:
            return new InvalidAuthorityError(logs);
        case 6054:
            return new InvalidTokenAccountMintError(logs);
        case 6055:
            return new ExcessiveLeaseWithdrawlError(logs);
        case 6056:
            return new InvalideHistoryAccountError(logs);
        case 6057:
            return new InvalidLeaseAccountEscrowError(logs);
        case 6058:
            return new InvalidCrankAccountError(logs);
        case 6059:
            return new CrankNoElementsReadyError(logs);
        case 6060:
            return new IndexOutOfBoundsError(logs);
        case 6061:
            return new VrfInvalidRequestError(logs);
        case 6062:
            return new VrfInvalidProofSubmissionError(logs);
        case 6063:
            return new VrfVerifyError(logs);
        case 6064:
            return new VrfCallbackError(logs);
        case 6065:
            return new VrfCallbackParamsError(logs);
        case 6066:
            return new VrfCallbackAlreadyCalledError(logs);
        case 6067:
            return new VrfInvalidPubkeyError(logs);
        case 6068:
            return new VrfTooManyVerifyCallsError(logs);
        case 6069:
            return new VrfRequestAlreadyLaunchedError(logs);
        case 6070:
            return new VrfInsufficientVerificationError(logs);
        case 6071:
            return new InvalidVrfProducerError(logs);
        case 6072:
            return new InvalidGovernancePidError(logs);
        case 6073:
            return new InvalidGovernanceAccountError(logs);
        case 6074:
            return new MissingOptionalAccount(logs);
        case 6075:
            return new InvalidSpawnRecordOwner(logs);
        case 6076:
            return new NoopError(logs);
        case 6077:
            return new MissingRequiredAccountsError(logs);
        case 6078:
            return new InvalidMintError(logs);
        case 6079:
            return new InvalidTokenAccountKeyError(logs);
        case 6080:
            return new InvalidJobAccountError(logs);
        case 6081:
            return new VoterStakeRegistryError(logs);
        case 6082:
            return new AccountDiscriminatorMismatch(logs);
        case 6083:
            return new FuckingImpossibleError(logs);
        case 6084:
            return new InvalidVrfRound(logs);
        case 6085:
            return new JobSizeExceeded(logs);
        case 6086:
            return new JobChunksExceeded(logs);
        case 6087:
            return new JobDataLocked(logs);
        case 6088:
            return new JobNotInitialized(logs);
        case 6089:
            return new BufferRelayerIllegalRoundOpenCall(logs);
        case 6090:
            return new InvalidSliderAccount(logs);
        case 6091:
            return new VrfLiteHasExistingPool(logs);
        case 6092:
            return new VrfPoolFull(logs);
        case 6093:
            return new VrfPoolEmpty(logs);
        case 6094:
            return new VrfAccountNotFound(logs);
        case 6095:
            return new AccountCloseNotReady(logs);
        case 6096:
            return new VrfPoolRequestTooSoon(logs);
        case 6097:
            return new VrfPoolMiss(logs);
        case 6098:
            return new VrfLiteOwnedByPool(logs);
        case 6099:
            return new InsufficientTokenBalance(logs);
    }
    return null;
}
//# sourceMappingURL=custom.js.map
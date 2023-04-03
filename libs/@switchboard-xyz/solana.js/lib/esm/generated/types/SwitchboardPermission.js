import * as borsh from '@coral-xyz/borsh';
export class PermitNone {
    constructor() {
        this.discriminator = 0;
        this.kind = 'PermitNone';
    }
    toJSON() {
        return {
            kind: 'PermitNone',
        };
    }
    toEncodable() {
        return {
            PermitOracleHeartbeat: {},
        };
    }
}
PermitNone.discriminator = 0;
PermitNone.kind = 'NONE';
export class PermitOracleHeartbeat {
    constructor() {
        this.discriminator = 1;
        this.kind = 'PermitOracleHeartbeat';
    }
    toJSON() {
        return {
            kind: 'PermitOracleHeartbeat',
        };
    }
    toEncodable() {
        return {
            PermitOracleHeartbeat: {},
        };
    }
}
PermitOracleHeartbeat.discriminator = 1;
PermitOracleHeartbeat.kind = 'PermitOracleHeartbeat';
export class PermitOracleQueueUsage {
    constructor() {
        this.discriminator = 2;
        this.kind = 'PermitOracleQueueUsage';
    }
    toJSON() {
        return {
            kind: 'PermitOracleQueueUsage',
        };
    }
    toEncodable() {
        return {
            PermitOracleQueueUsage: {},
        };
    }
}
PermitOracleQueueUsage.discriminator = 2;
PermitOracleQueueUsage.kind = 'PermitOracleQueueUsage';
export class PermitVrfRequests {
    constructor() {
        this.discriminator = 4;
        this.kind = 'PermitVrfRequests';
    }
    toJSON() {
        return {
            kind: 'PermitVrfRequests',
        };
    }
    toEncodable() {
        return {
            PermitVrfRequests: {},
        };
    }
}
PermitVrfRequests.discriminator = 4;
PermitVrfRequests.kind = 'PermitVrfRequests';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Invalid enum object');
    }
    if ('PermitNone' in obj) {
        return new PermitNone();
    }
    if ('PermitOracleHeartbeat' in obj) {
        return new PermitOracleHeartbeat();
    }
    if ('PermitOracleQueueUsage' in obj) {
        return new PermitOracleQueueUsage();
    }
    if ('PermitVrfRequests' in obj) {
        return new PermitVrfRequests();
    }
    throw new Error('Invalid enum object');
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case 'PermitNone': {
            return new PermitNone();
        }
        case 'PermitOracleHeartbeat': {
            return new PermitOracleHeartbeat();
        }
        case 'PermitOracleQueueUsage': {
            return new PermitOracleQueueUsage();
        }
        case 'PermitVrfRequests': {
            return new PermitVrfRequests();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        // borsh.struct([], 'PermitNone'),
        borsh.struct([], 'PermitOracleHeartbeat'),
        borsh.struct([], 'PermitOracleQueueUsage'),
        borsh.struct([], 'PermitVrfRequests'),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=SwitchboardPermission.js.map
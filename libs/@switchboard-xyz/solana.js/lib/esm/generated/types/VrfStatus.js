import * as borsh from '@coral-xyz/borsh';
export class StatusNone {
    constructor() {
        this.discriminator = 0;
        this.kind = 'StatusNone';
    }
    toJSON() {
        return {
            kind: 'StatusNone',
        };
    }
    toEncodable() {
        return {
            StatusNone: {},
        };
    }
}
StatusNone.discriminator = 0;
StatusNone.kind = 'StatusNone';
export class StatusRequesting {
    constructor() {
        this.discriminator = 1;
        this.kind = 'StatusRequesting';
    }
    toJSON() {
        return {
            kind: 'StatusRequesting',
        };
    }
    toEncodable() {
        return {
            StatusRequesting: {},
        };
    }
}
StatusRequesting.discriminator = 1;
StatusRequesting.kind = 'StatusRequesting';
export class StatusVerifying {
    constructor() {
        this.discriminator = 2;
        this.kind = 'StatusVerifying';
    }
    toJSON() {
        return {
            kind: 'StatusVerifying',
        };
    }
    toEncodable() {
        return {
            StatusVerifying: {},
        };
    }
}
StatusVerifying.discriminator = 2;
StatusVerifying.kind = 'StatusVerifying';
export class StatusVerified {
    constructor() {
        this.discriminator = 3;
        this.kind = 'StatusVerified';
    }
    toJSON() {
        return {
            kind: 'StatusVerified',
        };
    }
    toEncodable() {
        return {
            StatusVerified: {},
        };
    }
}
StatusVerified.discriminator = 3;
StatusVerified.kind = 'StatusVerified';
export class StatusCallbackSuccess {
    constructor() {
        this.discriminator = 4;
        this.kind = 'StatusCallbackSuccess';
    }
    toJSON() {
        return {
            kind: 'StatusCallbackSuccess',
        };
    }
    toEncodable() {
        return {
            StatusCallbackSuccess: {},
        };
    }
}
StatusCallbackSuccess.discriminator = 4;
StatusCallbackSuccess.kind = 'StatusCallbackSuccess';
export class StatusVerifyFailure {
    constructor() {
        this.discriminator = 5;
        this.kind = 'StatusVerifyFailure';
    }
    toJSON() {
        return {
            kind: 'StatusVerifyFailure',
        };
    }
    toEncodable() {
        return {
            StatusVerifyFailure: {},
        };
    }
}
StatusVerifyFailure.discriminator = 5;
StatusVerifyFailure.kind = 'StatusVerifyFailure';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Invalid enum object');
    }
    if ('StatusNone' in obj) {
        return new StatusNone();
    }
    if ('StatusRequesting' in obj) {
        return new StatusRequesting();
    }
    if ('StatusVerifying' in obj) {
        return new StatusVerifying();
    }
    if ('StatusVerified' in obj) {
        return new StatusVerified();
    }
    if ('StatusCallbackSuccess' in obj) {
        return new StatusCallbackSuccess();
    }
    if ('StatusVerifyFailure' in obj) {
        return new StatusVerifyFailure();
    }
    throw new Error('Invalid enum object');
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case 'StatusNone': {
            return new StatusNone();
        }
        case 'StatusRequesting': {
            return new StatusRequesting();
        }
        case 'StatusVerifying': {
            return new StatusVerifying();
        }
        case 'StatusVerified': {
            return new StatusVerified();
        }
        case 'StatusCallbackSuccess': {
            return new StatusCallbackSuccess();
        }
        case 'StatusVerifyFailure': {
            return new StatusVerifyFailure();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], 'StatusNone'),
        borsh.struct([], 'StatusRequesting'),
        borsh.struct([], 'StatusVerifying'),
        borsh.struct([], 'StatusVerified'),
        borsh.struct([], 'StatusCallbackSuccess'),
        borsh.struct([], 'StatusVerifyFailure'),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=VrfStatus.js.map
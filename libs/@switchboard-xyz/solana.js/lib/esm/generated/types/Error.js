import * as borsh from '@coral-xyz/borsh';
export class InvalidPublicKey {
    constructor() {
        this.discriminator = 0;
        this.kind = 'InvalidPublicKey';
    }
    toJSON() {
        return {
            kind: 'InvalidPublicKey',
        };
    }
    toEncodable() {
        return {
            InvalidPublicKey: {},
        };
    }
}
InvalidPublicKey.discriminator = 0;
InvalidPublicKey.kind = 'InvalidPublicKey';
export class SerializationError {
    constructor() {
        this.discriminator = 1;
        this.kind = 'SerializationError';
    }
    toJSON() {
        return {
            kind: 'SerializationError',
        };
    }
    toEncodable() {
        return {
            SerializationError: {},
        };
    }
}
SerializationError.discriminator = 1;
SerializationError.kind = 'SerializationError';
export class DeserializationError {
    constructor() {
        this.discriminator = 2;
        this.kind = 'DeserializationError';
    }
    toJSON() {
        return {
            kind: 'DeserializationError',
        };
    }
    toEncodable() {
        return {
            DeserializationError: {},
        };
    }
}
DeserializationError.discriminator = 2;
DeserializationError.kind = 'DeserializationError';
export class InvalidDataError {
    constructor() {
        this.discriminator = 3;
        this.kind = 'InvalidDataError';
    }
    toJSON() {
        return {
            kind: 'InvalidDataError',
        };
    }
    toEncodable() {
        return {
            InvalidDataError: {},
        };
    }
}
InvalidDataError.discriminator = 3;
InvalidDataError.kind = 'InvalidDataError';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Invalid enum object');
    }
    if ('InvalidPublicKey' in obj) {
        return new InvalidPublicKey();
    }
    if ('SerializationError' in obj) {
        return new SerializationError();
    }
    if ('DeserializationError' in obj) {
        return new DeserializationError();
    }
    if ('InvalidDataError' in obj) {
        return new InvalidDataError();
    }
    throw new Error('Invalid enum object');
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case 'InvalidPublicKey': {
            return new InvalidPublicKey();
        }
        case 'SerializationError': {
            return new SerializationError();
        }
        case 'DeserializationError': {
            return new DeserializationError();
        }
        case 'InvalidDataError': {
            return new InvalidDataError();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], 'InvalidPublicKey'),
        borsh.struct([], 'SerializationError'),
        borsh.struct([], 'DeserializationError'),
        borsh.struct([], 'InvalidDataError'),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=Error.js.map
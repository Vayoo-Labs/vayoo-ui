import * as borsh from '@coral-xyz/borsh';
export class TypeSuccess {
    constructor() {
        this.discriminator = 0;
        this.kind = 'TypeSuccess';
    }
    toJSON() {
        return {
            kind: 'TypeSuccess',
        };
    }
    toEncodable() {
        return {
            TypeSuccess: {},
        };
    }
}
TypeSuccess.discriminator = 0;
TypeSuccess.kind = 'TypeSuccess';
export class TypeError {
    constructor() {
        this.discriminator = 1;
        this.kind = 'TypeError';
    }
    toJSON() {
        return {
            kind: 'TypeError',
        };
    }
    toEncodable() {
        return {
            TypeError: {},
        };
    }
}
TypeError.discriminator = 1;
TypeError.kind = 'TypeError';
export class TypeDisagreement {
    constructor() {
        this.discriminator = 2;
        this.kind = 'TypeDisagreement';
    }
    toJSON() {
        return {
            kind: 'TypeDisagreement',
        };
    }
    toEncodable() {
        return {
            TypeDisagreement: {},
        };
    }
}
TypeDisagreement.discriminator = 2;
TypeDisagreement.kind = 'TypeDisagreement';
export class TypeNoResponse {
    constructor() {
        this.discriminator = 3;
        this.kind = 'TypeNoResponse';
    }
    toJSON() {
        return {
            kind: 'TypeNoResponse',
        };
    }
    toEncodable() {
        return {
            TypeNoResponse: {},
        };
    }
}
TypeNoResponse.discriminator = 3;
TypeNoResponse.kind = 'TypeNoResponse';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Invalid enum object');
    }
    if ('TypeSuccess' in obj) {
        return new TypeSuccess();
    }
    if ('TypeError' in obj) {
        return new TypeError();
    }
    if ('TypeDisagreement' in obj) {
        return new TypeDisagreement();
    }
    if ('TypeNoResponse' in obj) {
        return new TypeNoResponse();
    }
    throw new Error('Invalid enum object');
}
export function fromJSON(obj) {
    switch (obj.kind) {
        case 'TypeSuccess': {
            return new TypeSuccess();
        }
        case 'TypeError': {
            return new TypeError();
        }
        case 'TypeDisagreement': {
            return new TypeDisagreement();
        }
        case 'TypeNoResponse': {
            return new TypeNoResponse();
        }
    }
}
export function layout(property) {
    const ret = borsh.rustEnum([
        borsh.struct([], 'TypeSuccess'),
        borsh.struct([], 'TypeError'),
        borsh.struct([], 'TypeDisagreement'),
        borsh.struct([], 'TypeNoResponse'),
    ]);
    if (property !== undefined) {
        return ret.replicate(property);
    }
    return ret;
}
//# sourceMappingURL=OracleResponseType.js.map
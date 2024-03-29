import * as borsh from '@coral-xyz/borsh';
export class AggregatorAddJobParams {
    constructor(fields) {
        this.weight = fields.weight;
    }
    static layout(property) {
        return borsh.struct([borsh.option(borsh.u8(), 'weight')], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new AggregatorAddJobParams({
            weight: obj.weight,
        });
    }
    static toEncodable(fields) {
        return {
            weight: fields.weight,
        };
    }
    toJSON() {
        return {
            weight: this.weight,
        };
    }
    static fromJSON(obj) {
        return new AggregatorAddJobParams({
            weight: obj.weight,
        });
    }
    toEncodable() {
        return AggregatorAddJobParams.toEncodable(this);
    }
}
//# sourceMappingURL=AggregatorAddJobParams.js.map
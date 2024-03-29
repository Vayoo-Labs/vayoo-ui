"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VrfBuilder = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class VrfBuilder {
    constructor(fields) {
        this.producer = fields.producer;
        this.status = fields.status;
        this.reprProof = fields.reprProof;
        this.proof = new types.EcvrfProofZC({ ...fields.proof });
        this.yPoint = fields.yPoint;
        this.stage = fields.stage;
        this.stage1Out = new types.EcvrfIntermediate({ ...fields.stage1Out });
        this.r1 = new types.EdwardsPointZC({ ...fields.r1 });
        this.r2 = new types.EdwardsPointZC({ ...fields.r2 });
        this.stage3Out = new types.EcvrfIntermediate({ ...fields.stage3Out });
        this.hPoint = new types.EdwardsPointZC({ ...fields.hPoint });
        this.sReduced = new types.Scalar({ ...fields.sReduced });
        this.yPointBuilder = fields.yPointBuilder.map(item => new types.FieldElementZC({ ...item }));
        this.yRistrettoPoint = new types.EdwardsPointZC({
            ...fields.yRistrettoPoint,
        });
        this.mulRound = fields.mulRound;
        this.hashPointsRound = fields.hashPointsRound;
        this.mulTmp1 = new types.CompletedPointZC({ ...fields.mulTmp1 });
        this.uPoint1 = new types.EdwardsPointZC({ ...fields.uPoint1 });
        this.uPoint2 = new types.EdwardsPointZC({ ...fields.uPoint2 });
        this.vPoint1 = new types.EdwardsPointZC({ ...fields.vPoint1 });
        this.vPoint2 = new types.EdwardsPointZC({ ...fields.vPoint2 });
        this.uPoint = new types.EdwardsPointZC({ ...fields.uPoint });
        this.vPoint = new types.EdwardsPointZC({ ...fields.vPoint });
        this.u1 = new types.FieldElementZC({ ...fields.u1 });
        this.u2 = new types.FieldElementZC({ ...fields.u2 });
        this.invertee = new types.FieldElementZC({ ...fields.invertee });
        this.y = new types.FieldElementZC({ ...fields.y });
        this.z = new types.FieldElementZC({ ...fields.z });
        this.p1Bytes = fields.p1Bytes;
        this.p2Bytes = fields.p2Bytes;
        this.p3Bytes = fields.p3Bytes;
        this.p4Bytes = fields.p4Bytes;
        this.cPrimeHashbuf = fields.cPrimeHashbuf;
        this.m1 = new types.FieldElementZC({ ...fields.m1 });
        this.m2 = new types.FieldElementZC({ ...fields.m2 });
        this.txRemaining = fields.txRemaining;
        this.verified = fields.verified;
        this.result = fields.result;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey('producer'),
            types.VrfStatus.layout('status'),
            borsh.array(borsh.u8(), 80, 'reprProof'),
            types.EcvrfProofZC.layout('proof'),
            borsh.publicKey('yPoint'),
            borsh.u32('stage'),
            types.EcvrfIntermediate.layout('stage1Out'),
            types.EdwardsPointZC.layout('r1'),
            types.EdwardsPointZC.layout('r2'),
            types.EcvrfIntermediate.layout('stage3Out'),
            types.EdwardsPointZC.layout('hPoint'),
            types.Scalar.layout('sReduced'),
            borsh.array(types.FieldElementZC.layout(), 3, 'yPointBuilder'),
            types.EdwardsPointZC.layout('yRistrettoPoint'),
            borsh.u8('mulRound'),
            borsh.u8('hashPointsRound'),
            types.CompletedPointZC.layout('mulTmp1'),
            types.EdwardsPointZC.layout('uPoint1'),
            types.EdwardsPointZC.layout('uPoint2'),
            types.EdwardsPointZC.layout('vPoint1'),
            types.EdwardsPointZC.layout('vPoint2'),
            types.EdwardsPointZC.layout('uPoint'),
            types.EdwardsPointZC.layout('vPoint'),
            types.FieldElementZC.layout('u1'),
            types.FieldElementZC.layout('u2'),
            types.FieldElementZC.layout('invertee'),
            types.FieldElementZC.layout('y'),
            types.FieldElementZC.layout('z'),
            borsh.array(borsh.u8(), 32, 'p1Bytes'),
            borsh.array(borsh.u8(), 32, 'p2Bytes'),
            borsh.array(borsh.u8(), 32, 'p3Bytes'),
            borsh.array(borsh.u8(), 32, 'p4Bytes'),
            borsh.array(borsh.u8(), 16, 'cPrimeHashbuf'),
            types.FieldElementZC.layout('m1'),
            types.FieldElementZC.layout('m2'),
            borsh.u32('txRemaining'),
            borsh.bool('verified'),
            borsh.array(borsh.u8(), 32, 'result'),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new VrfBuilder({
            producer: obj.producer,
            status: types.VrfStatus.fromDecoded(obj.status),
            reprProof: obj.reprProof,
            proof: types.EcvrfProofZC.fromDecoded(obj.proof),
            yPoint: obj.yPoint,
            stage: obj.stage,
            stage1Out: types.EcvrfIntermediate.fromDecoded(obj.stage1Out),
            r1: types.EdwardsPointZC.fromDecoded(obj.r1),
            r2: types.EdwardsPointZC.fromDecoded(obj.r2),
            stage3Out: types.EcvrfIntermediate.fromDecoded(obj.stage3Out),
            hPoint: types.EdwardsPointZC.fromDecoded(obj.hPoint),
            sReduced: types.Scalar.fromDecoded(obj.sReduced),
            yPointBuilder: obj.yPointBuilder.map((item /* eslint-disable-line @typescript-eslint/no-explicit-any */) => types.FieldElementZC.fromDecoded(item)),
            yRistrettoPoint: types.EdwardsPointZC.fromDecoded(obj.yRistrettoPoint),
            mulRound: obj.mulRound,
            hashPointsRound: obj.hashPointsRound,
            mulTmp1: types.CompletedPointZC.fromDecoded(obj.mulTmp1),
            uPoint1: types.EdwardsPointZC.fromDecoded(obj.uPoint1),
            uPoint2: types.EdwardsPointZC.fromDecoded(obj.uPoint2),
            vPoint1: types.EdwardsPointZC.fromDecoded(obj.vPoint1),
            vPoint2: types.EdwardsPointZC.fromDecoded(obj.vPoint2),
            uPoint: types.EdwardsPointZC.fromDecoded(obj.uPoint),
            vPoint: types.EdwardsPointZC.fromDecoded(obj.vPoint),
            u1: types.FieldElementZC.fromDecoded(obj.u1),
            u2: types.FieldElementZC.fromDecoded(obj.u2),
            invertee: types.FieldElementZC.fromDecoded(obj.invertee),
            y: types.FieldElementZC.fromDecoded(obj.y),
            z: types.FieldElementZC.fromDecoded(obj.z),
            p1Bytes: obj.p1Bytes,
            p2Bytes: obj.p2Bytes,
            p3Bytes: obj.p3Bytes,
            p4Bytes: obj.p4Bytes,
            cPrimeHashbuf: obj.cPrimeHashbuf,
            m1: types.FieldElementZC.fromDecoded(obj.m1),
            m2: types.FieldElementZC.fromDecoded(obj.m2),
            txRemaining: obj.txRemaining,
            verified: obj.verified,
            result: obj.result,
        });
    }
    static toEncodable(fields) {
        return {
            producer: fields.producer,
            status: fields.status.toEncodable(),
            reprProof: fields.reprProof,
            proof: types.EcvrfProofZC.toEncodable(fields.proof),
            yPoint: fields.yPoint,
            stage: fields.stage,
            stage1Out: types.EcvrfIntermediate.toEncodable(fields.stage1Out),
            r1: types.EdwardsPointZC.toEncodable(fields.r1),
            r2: types.EdwardsPointZC.toEncodable(fields.r2),
            stage3Out: types.EcvrfIntermediate.toEncodable(fields.stage3Out),
            hPoint: types.EdwardsPointZC.toEncodable(fields.hPoint),
            sReduced: types.Scalar.toEncodable(fields.sReduced),
            yPointBuilder: fields.yPointBuilder.map(item => types.FieldElementZC.toEncodable(item)),
            yRistrettoPoint: types.EdwardsPointZC.toEncodable(fields.yRistrettoPoint),
            mulRound: fields.mulRound,
            hashPointsRound: fields.hashPointsRound,
            mulTmp1: types.CompletedPointZC.toEncodable(fields.mulTmp1),
            uPoint1: types.EdwardsPointZC.toEncodable(fields.uPoint1),
            uPoint2: types.EdwardsPointZC.toEncodable(fields.uPoint2),
            vPoint1: types.EdwardsPointZC.toEncodable(fields.vPoint1),
            vPoint2: types.EdwardsPointZC.toEncodable(fields.vPoint2),
            uPoint: types.EdwardsPointZC.toEncodable(fields.uPoint),
            vPoint: types.EdwardsPointZC.toEncodable(fields.vPoint),
            u1: types.FieldElementZC.toEncodable(fields.u1),
            u2: types.FieldElementZC.toEncodable(fields.u2),
            invertee: types.FieldElementZC.toEncodable(fields.invertee),
            y: types.FieldElementZC.toEncodable(fields.y),
            z: types.FieldElementZC.toEncodable(fields.z),
            p1Bytes: fields.p1Bytes,
            p2Bytes: fields.p2Bytes,
            p3Bytes: fields.p3Bytes,
            p4Bytes: fields.p4Bytes,
            cPrimeHashbuf: fields.cPrimeHashbuf,
            m1: types.FieldElementZC.toEncodable(fields.m1),
            m2: types.FieldElementZC.toEncodable(fields.m2),
            txRemaining: fields.txRemaining,
            verified: fields.verified,
            result: fields.result,
        };
    }
    toJSON() {
        return {
            producer: this.producer.toString(),
            status: this.status.toJSON(),
            reprProof: this.reprProof,
            proof: this.proof.toJSON(),
            yPoint: this.yPoint.toString(),
            stage: this.stage,
            stage1Out: this.stage1Out.toJSON(),
            r1: this.r1.toJSON(),
            r2: this.r2.toJSON(),
            stage3Out: this.stage3Out.toJSON(),
            hPoint: this.hPoint.toJSON(),
            sReduced: this.sReduced.toJSON(),
            yPointBuilder: this.yPointBuilder.map(item => item.toJSON()),
            yRistrettoPoint: this.yRistrettoPoint.toJSON(),
            mulRound: this.mulRound,
            hashPointsRound: this.hashPointsRound,
            mulTmp1: this.mulTmp1.toJSON(),
            uPoint1: this.uPoint1.toJSON(),
            uPoint2: this.uPoint2.toJSON(),
            vPoint1: this.vPoint1.toJSON(),
            vPoint2: this.vPoint2.toJSON(),
            uPoint: this.uPoint.toJSON(),
            vPoint: this.vPoint.toJSON(),
            u1: this.u1.toJSON(),
            u2: this.u2.toJSON(),
            invertee: this.invertee.toJSON(),
            y: this.y.toJSON(),
            z: this.z.toJSON(),
            p1Bytes: this.p1Bytes,
            p2Bytes: this.p2Bytes,
            p3Bytes: this.p3Bytes,
            p4Bytes: this.p4Bytes,
            cPrimeHashbuf: this.cPrimeHashbuf,
            m1: this.m1.toJSON(),
            m2: this.m2.toJSON(),
            txRemaining: this.txRemaining,
            verified: this.verified,
            result: this.result,
        };
    }
    static fromJSON(obj) {
        return new VrfBuilder({
            producer: new web3_js_1.PublicKey(obj.producer),
            status: types.VrfStatus.fromJSON(obj.status),
            reprProof: obj.reprProof,
            proof: types.EcvrfProofZC.fromJSON(obj.proof),
            yPoint: new web3_js_1.PublicKey(obj.yPoint),
            stage: obj.stage,
            stage1Out: types.EcvrfIntermediate.fromJSON(obj.stage1Out),
            r1: types.EdwardsPointZC.fromJSON(obj.r1),
            r2: types.EdwardsPointZC.fromJSON(obj.r2),
            stage3Out: types.EcvrfIntermediate.fromJSON(obj.stage3Out),
            hPoint: types.EdwardsPointZC.fromJSON(obj.hPoint),
            sReduced: types.Scalar.fromJSON(obj.sReduced),
            yPointBuilder: obj.yPointBuilder.map(item => types.FieldElementZC.fromJSON(item)),
            yRistrettoPoint: types.EdwardsPointZC.fromJSON(obj.yRistrettoPoint),
            mulRound: obj.mulRound,
            hashPointsRound: obj.hashPointsRound,
            mulTmp1: types.CompletedPointZC.fromJSON(obj.mulTmp1),
            uPoint1: types.EdwardsPointZC.fromJSON(obj.uPoint1),
            uPoint2: types.EdwardsPointZC.fromJSON(obj.uPoint2),
            vPoint1: types.EdwardsPointZC.fromJSON(obj.vPoint1),
            vPoint2: types.EdwardsPointZC.fromJSON(obj.vPoint2),
            uPoint: types.EdwardsPointZC.fromJSON(obj.uPoint),
            vPoint: types.EdwardsPointZC.fromJSON(obj.vPoint),
            u1: types.FieldElementZC.fromJSON(obj.u1),
            u2: types.FieldElementZC.fromJSON(obj.u2),
            invertee: types.FieldElementZC.fromJSON(obj.invertee),
            y: types.FieldElementZC.fromJSON(obj.y),
            z: types.FieldElementZC.fromJSON(obj.z),
            p1Bytes: obj.p1Bytes,
            p2Bytes: obj.p2Bytes,
            p3Bytes: obj.p3Bytes,
            p4Bytes: obj.p4Bytes,
            cPrimeHashbuf: obj.cPrimeHashbuf,
            m1: types.FieldElementZC.fromJSON(obj.m1),
            m2: types.FieldElementZC.fromJSON(obj.m2),
            txRemaining: obj.txRemaining,
            verified: obj.verified,
            result: obj.result,
        });
    }
    toEncodable() {
        return VrfBuilder.toEncodable(this);
    }
}
exports.VrfBuilder = VrfBuilder;
//# sourceMappingURL=VrfBuilder.js.map
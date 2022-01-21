"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.addToValidatedRequestState = exports.addToTransactionState = exports.addToRecordsState = exports.addToHelperState = void 0;
const R = __importStar(require("ramda"));
const constants_1 = require("../config/constants");
const addToState = (contextKey, context, dataToAddToContext) => ({
    ...context.state[contextKey],
    ...dataToAddToContext
});
const addToHelperState = R.partial(addToState, [constants_1.stateKeys.helpers]);
exports.addToHelperState = addToHelperState;
const addToRecordsState = R.partial(addToState, [constants_1.stateKeys.records]);
exports.addToRecordsState = addToRecordsState;
const addToTransactionState = R.partial(addToState, [constants_1.stateKeys.transactions]);
exports.addToTransactionState = addToTransactionState;
const addToValidatedRequestState = R.partial(addToState, [constants_1.stateKeys.validatedRequest]);
exports.addToValidatedRequestState = addToValidatedRequestState;
//# sourceMappingURL=context.js.map
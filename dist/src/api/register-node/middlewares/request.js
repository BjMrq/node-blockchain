"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNodeRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const validate_request_1 = require("../../../middlewares/wrappers/validate-request");
exports.registerNodeRequest = (0, validate_request_1.validateBodyRequest)(joi_1.default.object({
    nodeHostname: joi_1.default.string().required()
}));
//# sourceMappingURL=request.js.map
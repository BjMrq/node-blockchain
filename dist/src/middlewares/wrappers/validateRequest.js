"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParamsRequest = exports.validateQueryRequest = exports.validateBodyRequest = void 0;
const variables_1 = require("config/variables");
const context_1 = require("utils/context");
const error_types_1 = require("config/errors/error.types");
const validateRequest = (origin) => (schema) => async (context, next) => {
    try {
        const toValidate = (origin === "params"
            ? context[origin]
            : context.request[origin]);
        await schema.validateAsync(toValidate);
        context.state[variables_1.stateKeys.validatedRequest] = (0, context_1.addToValidatedRequestState)(context, toValidate);
    }
    catch (error) {
        const validationError = new error_types_1.UnprocessableEntityError(error.details[0].message);
        context.throw(validationError);
    }
    await next();
};
exports.validateBodyRequest = validateRequest("body");
exports.validateQueryRequest = validateRequest("query");
exports.validateParamsRequest = validateRequest("params");
//# sourceMappingURL=validateRequest.js.map
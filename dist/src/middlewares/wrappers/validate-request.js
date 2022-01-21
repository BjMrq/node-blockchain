"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParamsRequest = exports.validateQueryRequest = exports.validateBodyRequest = void 0;
const constants_1 = require("../../config/constants");
const errors_1 = require("../../config/errors");
const context_1 = require("../../utils/context");
const validateRequest = origin => schema => async (context, next) => {
    try {
        const toValidate = (origin === 'params' ? context[origin] : context.request[origin]);
        await schema.validateAsync(toValidate);
        context.state[constants_1.stateKeys.validatedRequest] = (0, context_1.addToValidatedRequestState)(context, toValidate);
    }
    catch (error) {
        const validationError = new errors_1.UnprocessableEntityError(error.details[0].message);
        context.throw(validationError);
    }
    await next();
};
exports.validateBodyRequest = validateRequest('body');
exports.validateQueryRequest = validateRequest('query');
exports.validateParamsRequest = validateRequest('params');
//# sourceMappingURL=validate-request.js.map
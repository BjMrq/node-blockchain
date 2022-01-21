"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../config/constants");
const withResponse = sendResponse => async (context) => {
    try {
        if (typeof sendResponse === 'function') {
            const responseData = await sendResponse(context);
            context.status = responseData.status || constants_1.httpResponses.ok;
            context.body = responseData.body || { status: 'success' };
        }
        else if (typeof sendResponse === 'object') {
            context.status = sendResponse.status || constants_1.httpResponses.ok;
            context.body = sendResponse.body || { status: 'success' };
        }
    }
    catch (error) {
        context.throw(error);
    }
};
exports.default = withResponse;
//# sourceMappingURL=with-response.js.map
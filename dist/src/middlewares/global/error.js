"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = async (context, next) => {
    try {
        await next();
    }
    catch (error) {
        const catchedError = error;
        context.app.emit('error', error, context);
        context.status = catchedError.expose ? catchedError.status : 500;
        context.body = {
            status: 'error',
            error: catchedError.expose ? catchedError.name : 'ServerError',
            message: catchedError.expose ? catchedError.message : 'Internal server error'
        };
    }
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.js.map
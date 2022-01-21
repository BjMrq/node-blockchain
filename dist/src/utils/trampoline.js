"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trampoline = void 0;
const trampoline = (functionToOptimize) => async (...allArguments) => {
    let result = await functionToOptimize(...allArguments);
    while (typeof result === 'function') {
        result = await result();
    }
    return result;
};
exports.trampoline = trampoline;
//# sourceMappingURL=trampoline.js.map
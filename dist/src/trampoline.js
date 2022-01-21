"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trampoline = void 0;
const trampoline = (functionToOptimize) => (...allArguments) => {
    let result = functionToOptimize(...allArguments);
    while (typeof result === 'function') {
        result = result();
    }
    return result;
};
exports.trampoline = trampoline;
//# sourceMappingURL=trampoline.js.map
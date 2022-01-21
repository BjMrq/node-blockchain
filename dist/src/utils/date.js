"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullDate = void 0;
const getFullDate = () => {
    const now = new Date();
    return `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
};
exports.getFullDate = getFullDate;
//# sourceMappingURL=date.js.map
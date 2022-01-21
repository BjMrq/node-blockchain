"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeRegistry = void 0;
const constants_1 = require("../config/constants");
exports.NodeRegistry = {
    nodeHostname: constants_1.nodeHostname,
    otherNodesHostnames: new Set(),
    registerNewNode(newNodeAddress) {
        this.otherNodesHostnames.add(newNodeAddress);
    }
};
//# sourceMappingURL=node-registration.js.map
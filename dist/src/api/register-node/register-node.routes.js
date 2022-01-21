"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNodeSubRouter = void 0;
const axios_1 = __importDefault(require("axios"));
const koa_router_1 = __importDefault(require("koa-router"));
const with_response_1 = __importDefault(require("../../middlewares/wrappers/with-response"));
const node_registration_1 = require("../../domains/nodes-registration/node-registration");
const request_1 = require("./middlewares/request");
const registerNodeSubRouter = () => {
    const router = new koa_router_1.default({
        prefix: '/register'
    });
    router.post('/register-node-and-broadcast', request_1.registerNodeRequest, (0, with_response_1.default)(async ({ state: { validatedRequest: { nodeHostname } } }) => {
        node_registration_1.NodeRegistry.registerNewNode(nodeHostname);
        for (const node of node_registration_1.NodeRegistry.otherNodesHostnames) {
            console.log((await axios_1.default.post(`http://${node}:3000/api/v1/register/register-node`, { nodeHostname })).data);
        }
        return {
            body: {
                status: 'SUCCESS'
            }
        };
    }));
    router.post('/register-node', request_1.registerNodeRequest, (0, with_response_1.default)(({ state: { validatedRequest: { nodeHostname } } }) => {
        node_registration_1.NodeRegistry.registerNewNode(nodeHostname);
        console.log('Current registered nodes are:', node_registration_1.NodeRegistry.otherNodesHostnames);
        return {
            body: {
                status: 'SUCCESS'
            }
        };
    }));
    router.post('/register-nodes-bulk', request_1.registerNodeRequest, (0, with_response_1.default)(({ state: { validatedRequest } }) => {
        return {
            body: {
                status: 'SUCCESS'
            }
        };
    }));
    return router.routes();
};
exports.registerNodeSubRouter = registerNodeSubRouter;
//# sourceMappingURL=register-node.routes.js.map
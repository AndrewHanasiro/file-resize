"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importStar(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var app_1 = __importDefault(require("./app"));
var server = (0, express_1.default)();
server.use((0, helmet_1.default)());
server.use((0, cors_1.default)({
    origin: /http:\/\/localhost:\d+$/,
}));
server.disable('x-powered-by');
server.use((0, express_1.urlencoded)({ extended: false, limit: '50mb' }));
server.use((0, express_1.json)({ limit: '50mb' }));
server.get('/health', function (req, res) {
    res.status(200).send('OK');
});
server.use(app_1.default);
var PORT = 5000;
server.listen(PORT, function () {
    console.warn("Server running on: ".concat(PORT));
});
exports.default = server;
//# sourceMappingURL=server.js.map
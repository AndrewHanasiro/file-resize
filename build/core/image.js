"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.image = void 0;
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var util_1 = require("util");
var sharp_1 = __importDefault(require("sharp"));
var execPromise = (0, util_1.promisify)(child_process_1.exec);
var mkdirPromise = (0, util_1.promisify)(fs_1.mkdir);
var unlinkPromise = (0, util_1.promisify)(fs_1.unlink);
var writeFilePromise = (0, util_1.promisify)(fs_1.writeFile);
var readFilePromise = (0, util_1.promisify)(fs_1.readFile);
function image(file, extension, resolution) {
    return __awaiter(this, void 0, void 0, function () {
        var tempFolder, hasTempFolder, compressFilePath, buffer, _a, compressFileBase64, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 11, , 12]);
                    tempFolder = path_1.default.join(process.cwd(), 'temp');
                    hasTempFolder = (0, fs_1.existsSync)(tempFolder);
                    if (!!hasTempFolder) return [3, 2];
                    return [4, mkdirPromise(tempFolder)];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    compressFilePath = path_1.default.join(process.cwd(), 'temp', "compress.".concat(extension));
                    buffer = Buffer.from(file, 'base64');
                    _a = extension;
                    switch (_a) {
                        case 'jpg': return [3, 3];
                        case 'png': return [3, 5];
                    }
                    return [3, 7];
                case 3: return [4, (0, sharp_1.default)(buffer)
                        .jpeg({ quality: resolution })
                        .toFile(compressFilePath)];
                case 4:
                    _b.sent();
                    return [3, 8];
                case 5: return [4, (0, sharp_1.default)(buffer)
                        .png({ quality: resolution })
                        .toFile(compressFilePath)];
                case 6:
                    _b.sent();
                    return [3, 8];
                case 7: throw new Error('extension not permitted');
                case 8: return [4, readFilePromise(compressFilePath, 'base64')];
                case 9:
                    compressFileBase64 = _b.sent();
                    return [4, unlinkPromise(compressFilePath)];
                case 10:
                    _b.sent();
                    return [2, compressFileBase64];
                case 11:
                    error_1 = _b.sent();
                    throw error_1;
                case 12: return [2];
            }
        });
    });
}
exports.image = image;
//# sourceMappingURL=image.js.map
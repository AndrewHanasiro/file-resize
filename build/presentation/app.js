"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var image_1 = __importDefault(require("./routes/image"));
var pdf_1 = __importDefault(require("./routes/pdf"));
var app = (0, express_1.Router)();
app.use(image_1.default);
app.use(pdf_1.default);
app.use(function (err, req, res, next) {
    if (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
    else {
        next();
    }
});
app.use(function (req, res) {
    res.status(404).send('Sorry cant find that');
});
exports.default = app;
//# sourceMappingURL=app.js.map
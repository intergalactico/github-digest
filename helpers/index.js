"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = __importDefault(require("colors"));
function successMsg(text) {
    console.log(colors_1.default.green(text));
}
exports.successMsg = successMsg;
function errorMsg(text) {
    console.log(colors_1.default.red(text));
}
exports.errorMsg = errorMsg;
function infoMsg(text) {
    console.log(colors_1.default.blue(text));
}
exports.infoMsg = infoMsg;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var hs = __importStar(require("../helpers"));
var model_1 = __importDefault(require("../model"));
var consts_1 = __importDefault(require("../consts"));
var db = new model_1.default();
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.createDatabaseFile = function (path) {
        try {
            fs_1.default.appendFileSync(path, "[]");
            hs.successMsg("New database has been created");
        }
        catch (err) {
            hs.errorMsg("Something went wrong");
            throw err;
        }
    };
    Controller.list = function () {
        db.listAll();
    };
    Controller.new = function (type, params) {
        switch (type) {
            case consts_1.default.ENDPOINT:
                return db.addEndpoint(params);
            case consts_1.default.REPO:
                return db.addRepo(params);
            default:
                break;
        }
    };
    return Controller;
}());
exports.default = Controller;

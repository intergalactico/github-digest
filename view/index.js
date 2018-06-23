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
var cli_table_1 = __importDefault(require("cli-table"));
var colors_1 = __importDefault(require("colors"));
var hs = __importStar(require("../helpers"));
var View = /** @class */ (function () {
    function View() {
    }
    View.renderEndpoint = function (endpoint) {
        var _this = this;
        console.log();
        hs.infoMsg("NAME:  " + endpoint.name);
        hs.infoMsg("URL:   " + endpoint.url);
        hs.infoMsg("TOKEN: " + endpoint.token);
        endpoint.repos.forEach(function (repo) { return _this.table.push([repo.name, repo.url]); });
        console.log(this.table.toString() + "\n");
        // Clear the table array
        this.table.length = 0;
    };
    View.renderAllEndpoints = function (endpoints) {
        var _this = this;
        endpoints.forEach(function (endpoint) { return _this.renderEndpoint(endpoint); });
    };
    View.table = new cli_table_1.default({
        head: [colors_1.default.green("Repo name"), colors_1.default.green("Url")],
        colWidths: [20, 50]
    });
    return View;
}());
exports.default = View;

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
var jsonfile_1 = __importDefault(require("jsonfile"));
var view_1 = __importDefault(require("../view"));
var hs = __importStar(require("../helpers"));
var defaultPath = __dirname + "/../db.json";
var Model = /** @class */ (function () {
    function Model(path) {
        if (path === void 0) { path = defaultPath; }
        this.path = path;
    }
    Object.defineProperty(Model.prototype, "database", {
        // Need to define return value. Array of objects.
        get: function () {
            return jsonfile_1.default.readFileSync(this.path);
        },
        // Need to define a type of arg. Array of objects.
        set: function (updatedDatabase) {
            jsonfile_1.default.writeFileSync(this.path, updatedDatabase);
        },
        enumerable: true,
        configurable: true
    });
    Model.prototype.listAll = function () {
        view_1.default.renderAllEndpoints(this.database);
    };
    // Add arg type
    Model.prototype.addEndpoint = function (params) {
        var newEndpoint = {
            id: params.id,
            name: params.name,
            url: params.url,
            token: params.token,
            repos: []
        };
        var isNameExists = this.database.find(function (endpoint) { return endpoint.name === newEndpoint.name; });
        if (isNameExists)
            return hs.errorMsg("Endpoint name already exists");
        try {
            this.database = this.database.concat([newEndpoint]);
            return hs.successMsg("New ENDPOINT added successfully");
        }
        catch (err) {
            hs.errorMsg("Something went wrong");
            throw err;
        }
    };
    // Add arg type
    Model.prototype.addRepo = function (params) {
        var newRepo = {
            id: params.id,
            name: params.name,
            url: params.url
        };
        var endpointIndex = this.database.findIndex(function (endpoint) {
            return endpoint.name === params.endpoint;
        });
        if (endpointIndex === -1)
            return hs.errorMsg("Wrong endpoint name");
        var isRepoNameExists = this.database[endpointIndex].repos.find(function (repo) { return repo.name === newRepo.name; });
        if (isRepoNameExists)
            return hs.errorMsg("Repo name already exists");
        try {
            this.database = this.database.map(function (endpoint, i) {
                if (i !== endpointIndex)
                    return endpoint;
                endpoint.repos.push(newRepo);
                return endpoint;
            });
            return hs.successMsg("New REPO added successfully");
        }
        catch (err) {
            hs.errorMsg("Something went wrong");
            throw err;
        }
    };
    return Model;
}());
exports.default = Model;

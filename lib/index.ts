import fs from "fs";
import jsonfile from "jsonfile";

interface IRepo {
  id: number;
  url: string;
  name: string;
}

interface IOptions {
  id: number;
  url: string;
  name: string;
  api?: string;
  token?: string;
  // Not sure about Array interface.
  // Need to investigate
  repos?: Array<IRepo>;
}

export default class Base {
  static createConfigFile(): void {
    try {
      // Path might be incorrect. Need to try it inside NPM module
      fs.appendFileSync(`${__dirname}/../config.json`, "[]");
      console.log("Config file has been created");
    } catch (err) {
      throw err;
    }
  }

  static writeToConfig(options: IOptions) {
    const path = `${__dirname}/../config.json`;
    const config = jsonfile.readFileSync(path);
    const isAPI = options.repos;
    const isNameFound = config.find((endpoint: IOptions) => {
      return endpoint.name === options.api;
    });

    if (isAPI) {
      return jsonfile.writeFileSync(path, config.concat([options]));
    }

    if (!isNameFound) {
      return console.log("API name doesn't exist");
    }

    const newConfig = config.map((endpoint: IOptions) => {
      const { api, ...restOptions } = options;
      if (endpoint.name !== api) return endpoint;
      // Need to solve it. Low priority.
      endpoint.repos.push(restOptions);
      return endpoint;
    });

    return jsonfile.writeFileSync(path, newConfig);
  }

  static add(command: string, options: IOptions): void {
    switch (command) {
      case "api":
        this.writeToConfig({ ...options, repos: [] });
        break;
      case "repo":
        this.writeToConfig(options);
        break;
      default:
        throw "Error: command doesn't exist";
    }
  }
}

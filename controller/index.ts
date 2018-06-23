import fs from "fs";
import * as hs from "../helpers";
import Model from "../model";
import consts from "../consts";

const db = new Model();

export default class Controller {
  static createDatabaseFile(path: string): void {
    try {
      fs.appendFileSync(path, "[]");
      hs.successMsg("New database has been created");
    } catch (err) {
      hs.errorMsg("Something went wrong");
      throw err;
    }
  }

  static list(): void {
    db.listAll();
  }

  static new(type, params) {
    switch (type) {
      case consts.ENDPOINT:
        return db.addEndpoint(params);
      case consts.REPO:
        return db.addRepo(params);
      default:
        break;
    }
  }
}

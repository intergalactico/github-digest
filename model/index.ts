import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import * as ts from "../types";

// Set up a database
const adapter = new FileSync(`${__dirname}/../db.json`);
const db = low(adapter);
db.defaults({ endpoints: [], repos: [] }).write();

export default class Model {
  list(): ts.Endpoint[] {
    const { endpoints, repos } = db.getState();
    return endpoints.map((endpoint: ts.Endpoint) => ({
      ...endpoint,
      repos: repos.filter((repo: ts.Repo) => repo.endpointId === endpoint.id)
    }));
  }

  add(type: string, params: ts.Endpoint | ts.Repo): boolean {
    try {
      db.get(`${type.toLowerCase()}s`)
        .push(params)
        .write();
      return true;
    } catch (e) {
      throw e;
    }
  }

  getEndpoints(name?: string) {
    if (!name) return db.get(`endpoints`).value();

    return db
      .get(`endpoints`)
      .find(endpoint => endpoint.name === name)
      .value();
  }
}

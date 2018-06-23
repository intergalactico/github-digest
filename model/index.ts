import jsonfile from "jsonfile";
import View from "../view";
import * as hs from "../helpers";

const defaultPath = `${__dirname}/../db.json`;

export default class Model {
  private path: string;
  constructor(path: string = defaultPath) {
    this.path = path;
  }

  // Need to define return value. Array of objects.
  get database() {
    return jsonfile.readFileSync(this.path);
  }

  // Need to define a type of arg. Array of objects.
  set database(updatedDatabase) {
    jsonfile.writeFileSync(this.path, updatedDatabase);
  }

  listAll(): void {
    View.renderAllEndpoints(this.database);
  }

  // Add arg type
  addEndpoint(params): void {
    const newEndpoint = {
      id: params.id,
      name: params.name,
      url: params.url,
      token: params.token,
      repos: []
    };

    const isNameExists = this.database.find(
      endpoint => endpoint.name === newEndpoint.name
    );

    if (isNameExists) return hs.errorMsg("Endpoint name already exists");

    try {
      this.database = [...this.database, newEndpoint];
      return hs.successMsg(`New ENDPOINT added successfully`);
    } catch (err) {
      hs.errorMsg("Something went wrong");
      throw err;
    }
  }

  // Add arg type
  addRepo(params): void {
    const newRepo = {
      id: params.id,
      name: params.name,
      org: params.org
    };
    const endpointIndex = this.database.findIndex(endpoint => {
      return endpoint.name === params.endpoint;
    });

    if (endpointIndex === -1) return hs.errorMsg("Wrong endpoint name");

    const isRepoNameExists = this.database[endpointIndex].repos.find(
      repo => repo.name === newRepo.name
    );

    if (isRepoNameExists) return hs.errorMsg("Repo name already exists");

    try {
      this.database = this.database.map((endpoint, i: number) => {
        if (i !== endpointIndex) return endpoint;
        endpoint.repos.push(newRepo);
        return endpoint;
      });
      return hs.successMsg(`New REPO added successfully`);
    } catch (err) {
      hs.errorMsg("Something went wrong");
      throw err;
    }
  }
}

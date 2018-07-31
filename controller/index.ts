import uuid from "uuid/v4";
import Model from "../model";
import View from "../view";
import * as ts from "../types";
import consts from "../consts";

const model = new Model();

export default class Controller {
  static list(): void {
    const endpoints: ts.Endpoint[] = model.list();
    View.renderAll(endpoints);
  }

  static add(type: string, options: any): void {
    let params: ts.Repo | ts.Endpoint;
    if (!type) {
      View.displayError(
        "Oops! Seems that you forgot to specify what you want to add. Use `add --help` to get a list of options"
      );
    }

    const endpoint = model.getEndpoints(options.endpoint);
    if (!endpoint) View.displayError("Endpoint doesn't exist");

    switch (type.toLowerCase()) {
      case consts.REPO:
        params = {
          id: uuid(),
          name: options.name,
          org: options.org,
          endpointId: endpoint.id
        };
        break;

      case consts.ENDPOINT:
        params = {
          id: uuid(),
          name: options.name,
          url: options.url,
          token: options.token
        };
        break;

      default:
        return View.displayError(
          "Subcommand doesn't exist. Use `--help` to get a list of available options"
        );
    }

    const isAdded: boolean = model.add(type, params);
    if (!isAdded) View.displayError("Something went wrong!");
    View.displaySuccess(`New ${type.toUpperCase()} has been added!`);
  }
}

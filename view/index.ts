import Table from "cli-table";
import colors from "colors";
import * as ts from "../types";

export default class View {
  static table: Table = new Table({
    head: [colors.green("Repo name"), colors.green("Organization")],
    colWidths: [20, 50]
  });

  static renderEndpoint(endpoint: ts.Endpoint): void {
    console.log();
    this.displayInfo(`NAME:  ${endpoint.name}`);
    this.displayInfo(`URL:   ${endpoint.url}`);
    this.displayInfo(`TOKEN: ${endpoint.token}`);

    if (endpoint.repos) {
      endpoint.repos.forEach(repo => this.table.push([repo.name, repo.org]));
    }

    console.log(this.table.toString() + "\n");
    // Clear the table array
    this.table.length = 0;
  }

  static renderAll(endpoints: ts.Endpoint[]): void {
    endpoints.forEach(endpoint => this.renderEndpoint(endpoint));
  }

  static displayError(message: string): void {
    return console.log(colors.red(message));
  }

  static displaySuccess(message: string): void {
    return console.log(colors.green(message));
  }

  static displayInfo(message: string): void {
    return console.log(colors.blue(message));
  }
}

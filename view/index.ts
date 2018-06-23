import Table from "cli-table";
import colors from "colors";

import * as hs from "../helpers";

export default class View {
  static table: Table = new Table({
    head: [colors.green("Repo name"), colors.green("Url")],
    colWidths: [20, 50]
  });

  static renderEndpoint(endpoint): void {
    console.log();
    hs.infoMsg(`NAME:  ${endpoint.name}`);
    hs.infoMsg(`URL:   ${endpoint.url}`);
    hs.infoMsg(`TOKEN: ${endpoint.token}`);
    endpoint.repos.forEach(repo => this.table.push([repo.name, repo.url]));
    console.log(this.table.toString() + "\n");
    // Clear the table array
    this.table.length = 0;
  }

  static renderAllEndpoints(endpoints): void {
    endpoints.forEach(endpoint => this.renderEndpoint(endpoint));
  }
}

#!/usr/bin/env node
import fs from "fs";

import commands from "./commands";
import consts from "../consts";
import Controller from "../controller";
import View from "../view";

const [command, subcommand] = commands._;

switch (command) {
  case consts.ADD:
    Controller.add(subcommand, commands);
    break;
  case consts.LIST:
    Controller.list();
    break;
  default:
    View.displayError(
      "Command doesn't exist. Use `--help` to get a list of available commands"
    );
    break;
}

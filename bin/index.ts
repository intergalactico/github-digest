#!/usr/bin/env node
import fs from "fs";

import commands from "./commands";
import consts from "../consts";
import * as hs from "../helpers";
import Controller from "../controller";

// Path might be incorrect. Need to try as the NPM module
const databasePath: string = `${__dirname}/../db.json`;
const isConfigExists: boolean = fs.existsSync(databasePath);
if (!isConfigExists) Controller.createDatabaseFile(databasePath);

const [command] = commands._;

switch (command) {
  case consts.ENDPOINT:
  case consts.REPO:
    Controller.new(command, { id: Date.now(), ...commands });
    break;
  case consts.LIST:
    Controller.list();
    break;
  case consts.FETCH:
    Controller.fetch(commands);
    break;
  default:
    hs.errorMsg(
      "Command doesn't exist. Use `--help` to get a list of available commands"
    );
    break;
}

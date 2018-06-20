#!/usr/bin/env node
import fs from "fs";
import Base from "../lib/index";
import args from "../lib/args";

// Path might be incorrect. Need to try as the NPM module
const isConfigExists = fs.existsSync(`${__dirname}/../config.json`);
if (!isConfigExists) Base.createConfigFile();

const [command] = args._;
const { url, name, token, api } = args;

switch (command) {
  case "api":
    Base.add(command, { id: Date.now(), url, name, token });
    break;
  case "repo":
    Base.add(command, { id: Date.now(), url, name, api });
    break;
  default:
    console.log(
      "Command doesn't exist. Use `gd --help` to get a list of available commands"
    );
    break;
}

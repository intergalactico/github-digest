import ys from "yargs";

export default ys
  .command("api", "Add an API endpoint", {
    url: {
      describe: "Define endpoint url",
      demand: true,
      alias: "u"
    },
    name: {
      describe: "Define name/alias",
      demand: true,
      alias: "n"
    },
    token: {
      describe: "Define token to get access to API",
      demand: true,
      alias: "t"
    }
  })
  .command("repo", "Add a repo to the existing endpoint", {
    url: {
      describe: "Define repo url",
      demand: true,
      alias: "u"
    },
    name: {
      describe: "Define name/alias",
      demand: true,
      alias: "n"
    },
    api: {
      describe: "Define api name",
      demand: true,
      alias: "a"
    }
  })
  .help().argv;

import ys from "yargs";

export default ys
  .command("api", "Add an API endpoint", {
    url: {
      describe: "Defines endpoint url",
      demand: true,
      alias: "u"
    },
    name: {
      describe: "Defines name/alias",
      demand: true,
      alias: "n"
    },
    token: {
      describe: "Defines token to get access to API",
      demand: true,
      alias: "t"
    }
  })
  .command("repo", "Add a repo to the existing endpoint", {
    url: {
      describe: "Defines repo url",
      demand: true,
      alias: "u"
    },
    name: {
      describe: "Defines repo name",
      demand: true,
      alias: "n"
    },
    api: {
      describe: "Defines related api name",
      demand: true,
      alias: "a"
    }
  })
  .help().argv;

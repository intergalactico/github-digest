import ys from "yargs";

export default ys
  .command("list", "Show list of all entities")
  .command("add", "Add endpoint/repo", () =>
    ys
      .command("endpoint", "Add an API endpoint", {
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
        org: {
          describe: "Defines repo organization",
          demand: true,
          alias: "o"
        },
        name: {
          describe: "Defines repo name",
          demand: true,
          alias: "n"
        },
        endpoint: {
          describe: "Defines related endpoint name",
          demand: true,
          alias: "e"
        }
      })
  )
  .help().argv;

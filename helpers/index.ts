import colors from "colors";

export function successMsg(text: string): void {
  console.log(colors.green(text));
}

export function errorMsg(text: string): void {
  console.log(colors.red(text));
}

export function infoMsg(text: string): void {
  console.log(colors.blue(text));
}

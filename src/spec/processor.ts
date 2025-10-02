import posthtml from "posthtml";
import retinate, { type RetinateOptions } from "..";

export default async function (
  inputHTML: string,
  options: Partial<RetinateOptions> = {},
) {
  const output = await posthtml().use(retinate(options)).process(inputHTML);
  return output.html;
}

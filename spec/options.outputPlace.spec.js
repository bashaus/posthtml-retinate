const process = require("./processor.js");
const expect = require("expect");

describe("retinate#outputPlace", () => {
  it("handles prepend", () => {
    expect(
      process('<img src="image@2x.png">', { outputPlace: "prepend" }),
    ).toEqual('<img src="image.png" srcset="@2ximage.png 2x">');
  });

  it("handles append", () => {
    expect(
      process('<img src="image@2x.png">', { outputPlace: "append" }),
    ).toEqual('<img src="image.png" srcset="image@2x.png 2x">');
  });
});

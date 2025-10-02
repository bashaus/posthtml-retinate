import process from "./processor";

describe("retinate#outputPlace", () => {
  it("handles prepend", async () => {
    const output = await process('<img src="image@2x.png">', {
      outputPlace: "prepend",
    });

    expect(output).toEqual('<img src="image.png" srcset="@2ximage.png 2x">');
  });

  it("handles append", async () => {
    const output = await process('<img src="image@2x.png">', {
      outputPlace: "append",
    });

    expect(output).toEqual('<img src="image.png" srcset="image@2x.png 2x">');
  });
});

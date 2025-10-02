import process from "./processor";

describe("retinate#inputPlace", () => {
  it("handles startsWith", async () => {
    const output = await process('<img src="@2ximage.png">', {
      inputPlace: "startsWith",
    });

    expect(output).toEqual('<img src="image.png" srcset="image@2x.png 2x">');
  });

  it("handles endsWith", async () => {
    const output = await process('<img src="image@2x.png">', {
      inputPlace: "endsWith",
    });

    expect(output).toEqual('<img src="image.png" srcset="image@2x.png 2x">');
  });
});

import process from "./processor";

describe("retinate#inputFlags", () => {
  it("handles custom flags", async () => {
    const output = await process('<img src="image-2x.png">', {
      inputFlags: { 2: "-2x" },
    });

    expect(output).toEqual('<img src="image.png" srcset="image@2x.png 2x">');
  });
});

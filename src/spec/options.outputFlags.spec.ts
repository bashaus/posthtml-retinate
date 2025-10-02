import process from "./processor";

describe("retinate#outputFlags", () => {
  it("handles custom flags", async () => {
    const output = await process('<img src="image@4x.png">', {
      outputFlags: { 1: "-1x", 2: "-2x" },
    });

    expect(output).toEqual('<img src="image-1x.png" srcset="image-2x.png 2x">');
  });
});

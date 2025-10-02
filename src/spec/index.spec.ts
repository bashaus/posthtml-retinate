import process from "./processor";

describe("retinate", () => {
  it("#defaults", async () => {
    const output = await process('<img src="image@4x.png">');
    expect(output).toEqual(
      '<img src="image.png" srcset="image@2x.png 2x, image@4x.png 4x">',
    );
  });

  it("handles no src", async () => {
    const output = await process('<img alt="image">');
    expect(output).toEqual('<img alt="image">');
  });

  it("handles no attributes", async () => {
    const output = await process("<img>");
    expect(output).toEqual("<img>");
  });

  it("handles no scale", async () => {
    const output = await process('<img src="image.png">');
    expect(output).toEqual('<img src="image.png">');
  });

  it("handles relative paths", async () => {
    const output = await process('<img src="../image@2x.png">');
    expect(output).toEqual(
      '<img src="../image.png" srcset="../image@2x.png 2x">',
    );
  });

  it("handles absolute paths", async () => {
    const output = await process('<img src="/images/image@2x.png">');
    expect(output).toEqual(
      '<img src="/images/image.png" srcset="/images/image@2x.png 2x">',
    );
  });
});

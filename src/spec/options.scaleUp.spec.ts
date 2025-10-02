import process from "./processor";

describe("retinate#scaleUp", () => {
  it("handles true", async () => {
    const output = await process('<img src="image@1x.png">', { scaleUp: true });

    expect(output).toEqual(
      '<img src="image.png" srcset="image@2x.png 2x, image@4x.png 4x">',
    );

    const output2 = await process('<img src="image@2x.png">', {
      scaleUp: true,
    });

    expect(output2).toEqual(
      '<img src="image.png" srcset="image@2x.png 2x, image@4x.png 4x">',
    );
  });

  it("handles false", async () => {
    const output = await process('<img src="image@1x.png">', {
      scaleUp: false,
    });

    expect(output).toEqual('<img src="image@1x.png">');

    const output2 = await process('<img src="image@2x.png">', {
      scaleUp: false,
    });

    expect(output2).toEqual('<img src="image.png" srcset="image@2x.png 2x">');
  });
});

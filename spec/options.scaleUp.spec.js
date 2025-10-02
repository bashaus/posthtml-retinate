const process = require("./processor.js");
const expect = require("expect");

describe("retinate#scaleUp", () => {
  it("handles true", () => {
    expect(process('<img src="image@1x.png">', { scaleUp: true })).toEqual(
      '<img src="image.png" srcset="image@2x.png 2x, image@4x.png 4x">',
    );

    expect(process('<img src="image@2x.png">', { scaleUp: true })).toEqual(
      '<img src="image.png" srcset="image@2x.png 2x, image@4x.png 4x">',
    );
  });

  it("handles false", () => {
    expect(process('<img src="image@1x.png">', { scaleUp: false })).toEqual(
      '<img src="image@1x.png">',
    );

    expect(process('<img src="image@2x.png">', { scaleUp: false })).toEqual(
      '<img src="image.png" srcset="image@2x.png 2x">',
    );
  });
});

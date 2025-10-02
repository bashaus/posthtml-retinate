import posthtml from "posthtml";
import retinate, { RetinateOptions } from ".";

export default async function process(
  inputHTML: string,
  options: Partial<RetinateOptions> = {},
) {
  const output = await posthtml().use(retinate(options)).process(inputHTML);
  return output.html;
}

describe("retinate", () => {
  it("should handle no src", async () => {
    const output = await process('<img alt="image">');
    expect(output).toEqual('<img alt="image">');
  });

  it("should handle no attributes", async () => {
    const output = await process("<img>");
    expect(output).toEqual("<img>");
  });

  it("should handle no scale", async () => {
    const output = await process('<img src="image.png">');
    expect(output).toEqual('<img src="image.png">');
  });

  it("should handle relative paths", async () => {
    const output = await process('<img src="../image@2x.png">');
    expect(output).toEqual(
      '<img src="../image.png" srcset="../image@2x.png 2x">',
    );
  });

  it("should handle absolute paths", async () => {
    const output = await process('<img src="/images/image@2x.png">');
    expect(output).toEqual(
      '<img src="/images/image.png" srcset="/images/image@2x.png 2x">',
    );
  });

  describe("#defaults", () => {
    it("should generate", async () => {
      const output = await process('<img src="image@4x.png">');
      expect(output).toEqual(
        '<img src="image.png" srcset="image@2x.png 2x, image@4x.png 4x">',
      );
    });
  });

  describe("#inputFlags", () => {
    it("handles custom flags", async () => {
      const output = await process('<img src="image-2x.png">', {
        inputFlags: { 2: "-2x" },
      });

      expect(output).toEqual('<img src="image.png" srcset="image@2x.png 2x">');
    });
  });

  describe("#inputPlace", () => {
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

  describe("#outputFlags", () => {
    it("handles custom flags", async () => {
      const output = await process('<img src="image@4x.png">', {
        outputFlags: { 1: "-1x", 2: "-2x" },
      });

      expect(output).toEqual(
        '<img src="image-1x.png" srcset="image-2x.png 2x">',
      );
    });
  });

  describe("#outputPlace", () => {
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

  describe("#scaleUp", () => {
    it.each([
      [
        '<img src="image@1x.png">',
        '<img src="image.png" srcset="image@2x.png 2x, image@4x.png 4x">',
      ],
      [
        '<img src="image@2x.png">',
        '<img src="image.png" srcset="image@2x.png 2x, image@4x.png 4x">',
      ],
    ])("handles true (%s)", async (input, expected) => {
      const actual = await process(input, { scaleUp: true });

      expect(actual).toEqual(expected);
    });

    it.each([
      ['<img src="image@1x.png">', '<img src="image@1x.png">'],
      [
        '<img src="image@2x.png">',
        '<img src="image.png" srcset="image@2x.png 2x">',
      ],
    ])("handles false (%s)", async (input, expected) => {
      const actual = await process(input, {
        scaleUp: false,
      });

      expect(actual).toEqual(expected);
    });
  });
});

import palette, { createGradient } from "./palette";

describe("Palette colors", () => {
  it("should return linear gradient str", () => {
    expect(createGradient("#C8FACD", "#5BE584")).toBe(
      "linear-gradient(to bottom, #C8FACD, #5BE584)"
    );
  });

  it("should return light color palate object", () => {
    expect(palette.light).toHaveProperty("grey");
  });
});

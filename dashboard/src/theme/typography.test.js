import typography from "./typography";

describe("Typography", () => {
  it("should match given object", () => {
    expect(typography).toMatchObject({
      fontFamily: expect.any(String),
      fontWeightRegular: expect.any(Number),
      fontWeightMedium: expect.any(Number),
      fontWeightBold: expect.any(Number),
      h1: expect.any(Object),
      h2: expect.any(Object),
      h3: expect.any(Object),
      h4: expect.any(Object),
      h5: expect.any(Object),
      h6: expect.any(Object),
      subtitle1: expect.any(Object),
      subtitle2: expect.any(Object),
      body1: expect.any(Object),
      body2: expect.any(Object),
      caption: expect.any(Object),
      overline: expect.any(Object),
      button: expect.any(Object),
    });
  });
});

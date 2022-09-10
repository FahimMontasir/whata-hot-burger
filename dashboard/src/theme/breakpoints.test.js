import breakpoints from "./breakpoints";

describe("Breakpoints", () => {
  it("should match the give object", () => {
    expect(breakpoints).toMatchObject({
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    });
  });
});

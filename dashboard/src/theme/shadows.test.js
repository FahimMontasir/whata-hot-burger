import shadows from "./shadows";

describe("Shadows", () => {
  it("should contain light and dark property", async () => {
    expect(shadows).toHaveProperty("light");
    expect(shadows).toHaveProperty("dark");
  });
});

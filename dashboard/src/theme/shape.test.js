import shape from "./shape";

describe("Shape", () => {
  it("should contain borderRadius", () => {
    expect(shape).toEqual({
      borderRadius: expect.any(Number),
      borderRadiusSm: expect.any(Number),
      borderRadiusMd: expect.any(Number),
    });
  });
});

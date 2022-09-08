const {
  getFirstCharacter,
  getAvatarColor,
  default: createAvatar,
} = require("./createAvatar");

describe("creating avatar", () => {
  it("should return capitalized first char of a name", () => {
    expect(getFirstCharacter("anis")).toBe("A");
  });

  it("should return primary avatar color", () => {
    expect(getAvatarColor("anis")).toBe("primary");
  });

  it("should return the first char and color str of the given value", () => {
    expect(createAvatar("anis")).toStrictEqual({ name: "A", color: "primary" });
  });
});

import { render } from "@testing-library/react";
import MyAvatar from "./MyAvatar";

const USER = {
  photoUrl: "abc.com",
  name: "fahim",
};

describe("MyAvatar", () => {
  it("should have user name in it", async () => {
    const { getByAltText } = render(<MyAvatar USER={USER} />);
    getByAltText("fahim");
  });
});

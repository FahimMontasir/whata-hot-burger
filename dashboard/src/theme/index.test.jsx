import ThemeConfig from "./index";
import renderer from "react-test-renderer";

describe("Theme", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(<ThemeConfig />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import renderer from "react-test-renderer";
import App from "./App";

describe("taking snapshot of the root file(App)", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

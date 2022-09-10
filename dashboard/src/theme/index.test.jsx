import ThemeConfig from "./index";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Theme", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(<ThemeConfig />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should debug console", () => {
    render(<App />);
    screen.debug();
  });
});

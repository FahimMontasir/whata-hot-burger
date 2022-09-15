import { render } from "@testing-library/react";
import Page from "./Page";
jest.mock("react-helmet-async");

describe("PageTest", () => {
  it("should debug", () => {
    const { getByText } = render(
      <Page title="hi">
        <h1>hello</h1>
      </Page>
    );

    getByText("hello");
  });
});

import DialogModal from "./DialogModal";
import { render } from "@testing-library/react";

describe("DialogModal", () => {
  it("should contain the given title", () => {
    const { getByText } = render(<DialogModal title="click me" />);
    expect(getByText(/click me/)).toBeInTheDocument();
  });
});

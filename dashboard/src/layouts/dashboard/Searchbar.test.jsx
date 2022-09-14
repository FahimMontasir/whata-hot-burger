import { render, screen } from "@testing-library/react";
import Searchbar from "./Searchbar";

describe("Search bar", () => {
  it("should work", async () => {
    render(<Searchbar />);
    const element = screen.getByRole("button");
    expect(element).toBeInTheDocument();

    // fireEvent.click(screen.getByRole("button"));
  });
});

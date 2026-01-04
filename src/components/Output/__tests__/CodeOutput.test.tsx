import { render, screen } from "@testing-library/react";
import { CodeOutput } from "../index";

describe("renders HTML and CSS code sections", () => {
  it("should render HTML and CSS code sections", () => {
    render(<CodeOutput htmlCode="<div></div>" cssCode="body{}" />);

    expect(screen.getByText("Código HTML")).toBeInTheDocument();
    expect(screen.getByText("Código CSS")).toBeInTheDocument();
    expect(screen.getByText("<div></div>")).toBeInTheDocument();
    expect(screen.getByText("body{}")).toBeInTheDocument();
  });

  it("handles empty code string", () => {
    const { container } = render(<CodeOutput htmlCode="" cssCode="" />);

    const preElements = container.querySelectorAll("pre");
    expect(preElements[0]).toHaveTextContent("");
    expect(preElements[1]).toHaveTextContent("");
  });
});

import { render, screen } from "@testing-library/react";
import { Header } from "../index";

describe("Header", () => {
  it("renders title and subtitle", () => {
    render(
      <Header
        title="Magic Background"
        subtitle="Transform your ideas into incredible backgrounds with the power of AI.Describe what you imagine and watch the magic happen."
      />
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Magic Background"
    );
    expect(
      screen.getByText(
        "Transform your ideas into incredible backgrounds with the power of AI.Describe what you imagine and watch the magic happen."
      )
    ).toBeInTheDocument();
  });
});

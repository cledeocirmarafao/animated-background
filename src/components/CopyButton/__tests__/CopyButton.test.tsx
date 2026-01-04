import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CopyButton } from "../index";

describe("CopyButton", () => {
  it("shows initial copy text", () => {
    render(<CopyButton text="test code" />);
    expect(screen.getByText("Copiar")).toBeInTheDocument();
  });

  it("shows success feedback after copying", async () => {
    const user = userEvent.setup();
    render(<CopyButton text="test" />);

    expect(screen.getByText("Copiar")).toBeInTheDocument();

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Copiado!")).toBeInTheDocument();
    });
  });

  it("resets feedback after 2 seconds", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null }); // Necessário com fake timers

    render(<CopyButton text="test" />);

    await user.click(screen.getByRole("button"));

    // Verifica que mostra "Copiado!"
    await waitFor(() => {
      expect(screen.getByText("Copiado!")).toBeInTheDocument();
    });

    // Avança o tempo em 2 segundos
    jest.advanceTimersByTime(2000);

    // Verifica que voltou para "Copiar"
    await waitFor(() => {
      expect(screen.getByText("Copiar")).toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it("has correct accessibility attributes", () => {
    render(<CopyButton text="test" />);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("title", "Copy Code");
  });
});

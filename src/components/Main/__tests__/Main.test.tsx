import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Main } from "../index";

const mockFetch = globalThis.fetch as jest.MockedFunction<typeof fetch>;

describe("Main", () => {
  const mockCallback = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Form validation", () => {
    it("disable submit when textarea is empty", () => {
      render(<Main onBackgroundGenerated={mockCallback} children />);

      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("enables submit when textarea has a valid text", async () => {
      render(<Main onBackgroundGenerated={mockCallback} children />);

      await user.type(screen.getByRole("textbox"), "Blue Gradient");

      expect(screen.getByRole("button")).toBeEnabled();
    });
  });

  describe("API integration", () => {
    it("calls API with user desccription on submit", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ code: "<div></div>", style: "body{}" }),
      } as Response);

      render(<Main onBackgroundGenerated={mockCallback} children />);

      await user.type(screen.getByRole("textbox"), "Blue gradient");
      await user.click(screen.getByRole("button"));

      expect(mockFetch).toHaveBeenCalledWith(
        "https://cledeocirmarafao.app.n8n.cloud/webhook/animated-background",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ description: "Blue gradient" }),
        })
      );
    });
  });

  describe("Error handing", () => {
    it("displays error message on API failure", async () => {
      mockFetch.mockRejectedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      render(<Main onBackgroundGenerated={mockCallback} children />);

      await user.type(screen.getByRole("textbox"), "test");
      await user.click(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
      });
    });
  });
});

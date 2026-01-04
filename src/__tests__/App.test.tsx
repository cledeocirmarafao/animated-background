import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const mockFetch = globalThis.fetch as jest.Mock;

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.head.innerHTML = "";
  });

  describe("Background generation", () => {
    it("renders background in DOM after sucessful generation", async () => {
      const user = userEvent.setup();
      const mockResponse = {
        code: '<div class="animated-bg"></div>',
        style: ".animated-bg { background: blue; }",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const { container, getByRole } = render(<App />);

      await user.type(getByRole("textbox"), "Blue gradient");
      await user.click(getByRole("button"));

      await waitFor(() => {
        const background = container.querySelector(".fixed.inset-0.-z-10");
        expect(background).toBeInTheDocument();
        expect(background?.innerHTML).toContain("animated-bg");
      });
    });

    it("inject CSS into document head", async () => {
      const user = userEvent.setup();
      mockFetch.mockReturnValueOnce({
        ok: true,
        json: async () => ({
          code: "<div></div>",
          style: "body { background: blue}",
        }),
      } as Response);

      const { getByRole } = render(<App />);

      await user.type(getByRole("textbox"), "Test");
      await user.click(getByRole("button"));

      await waitFor(() => {
        const styleTag = document.head.querySelector("style");
        expect(styleTag?.innerHTML).toContain("body { background: blue");
      });
    });
  });

  describe("State management", () => {
    it("replaces previous background with new one", async () => {
      const user = userEvent.setup();

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            code: '<div class="first"></div>',
            style: ".first {}",
          }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            code: '<div class="second"></div>',
            style: ".second {}",
          }),
        } as Response);

      const { container, getByRole } = render(<App />);
      const textarea = getByRole("textbox");
      const button = getByRole("button");

      await user.type(textarea, "First");
      await user.click(button);
      await waitFor(() => expect(container.innerHTML).toContain("first"));

      await user.clear(textarea);
      await user.type(textarea, "Second");
      await user.click(button);

      await waitFor(() => {
        expect(container.innerHTML).toContain("second");
      });
    });
  });

  describe("Error lading", () => {
    it("does not render background with API fails", async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      const { container, getByRole } = render(<App />);

      await user.type(getByRole("textbox"), "Test");
      await user.click(getByRole("button"));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });

      expect(
        container.querySelector(".fixed.inset-0.-z-10")
      ).not.toBeInTheDocument();
      expect(document.head.querySelector("style")).not.toBeInTheDocument();
    });
  });
});

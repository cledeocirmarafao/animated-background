import { type ChangeEvent, type FormEvent, useState } from "react";

interface MainProps {
  children: React.ReactNode;
  onBackgroundGenerated?: (html: string, css: string) => void;
}

interface N8nResponse {
  code: string;
  style: string;
  preview?: string;
}

export const Main = ({ children, onBackgroundGenerated }: MainProps) => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://cledeocirmarafao.app.n8n.cloud/webhook/animated-background",
        {
          method: "POST",
          headers: {
            "Content-Type": "appLication/json",
          },
          body: JSON.stringify({ description }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate background");
      }

      const backgroundData: N8nResponse = await response.json();

      if (
        onBackgroundGenerated &&
        backgroundData.code &&
        backgroundData.style
      ) {
        onBackgroundGenerated(backgroundData.code, backgroundData.style);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.error("Error generating background", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <main className="max-w-5xl m-auto z-10 relative">
      <section className="border border-solid border-purple-800/50 rounded-2xl p-8 mb-8">
        <h2 className="text-center mb-8 text-2xl">
          Describe the background you want
        </h2>

        <form id="form" onSubmit={handleSubmit}>
          <textarea
            className="bg-white/5 text-white w-full min-h-32 p-4 border border-solid border-purple-600/50 rounded-lg mb-5 resize-none text-[1rem] focus:outline-none focus:border-purple-500/50 placeholder:text-neutral-300/70"
            id="description"
            onChange={handleChange}
            value={description}
            disabled={isLoading}
            placeholder="Example: A smooth blue gradient that goes from light blue to dark blue."
            rows={5}
          ></textarea>
          {error && <p className="text-red-600/50 mt-2 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-4 px-8 bg-[linear-gradient(90deg,#3F1569_0%,#D47800_50%,#13785A_100%)] text-white border-none rounded-lg text-[1.2rem] font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1"
            id="generate-button"
            disabled={isLoading || !description.trim()}
          >
            {isLoading ? "Generating..." : "Genarate Magic Background"}
          </button>
        </form>
      </section>

      {children}
    </main>
  );
};

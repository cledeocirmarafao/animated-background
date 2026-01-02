interface CodeOutputProps {
  htmlCode: string;
  cssCode: string;
}

export const CodeOutput = ({htmlCode, cssCode}: CodeOutputProps) => {
  return (
    <section
      id="code-output"
      className="flex gap-6 justify-center not-md:flex-col pb-8"
    >
      <div className="bg-gray-500/20 border border-solid border-purple-800/50 rounded-2xl p-6 w-3/6 not-md:w-full">
        <h3 className="text-2xl mb-4 text-center">Código HTML</h3>
        <pre
          id="html-code"
          className="bg-neutral-950  text-teal-300 rounded-lg p-4 text-[1rem] whitespace-pre-wrap wrap-break-word"
        >{htmlCode || ''}</pre>
      </div>

      <div className="bg-gray-500/20 border border-solid border-purple-800/50 rounded-2xl p-6 w-3/6 not-md:w-full">
        <h3 className="text-2xl mb-4 text-center">Código CSS</h3>
        <pre
          id="css-code"
          className="bg-neutral-950  text-teal-300 rounded-lg p-4 text-[1rem] whitespace-pre-wrap wrap-break-word"
        >{cssCode || ''}</pre>
      </div>
    </section>
  );
};

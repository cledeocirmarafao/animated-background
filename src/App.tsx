import "./components/css/globals.css";
import { useState } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { CodeOutput } from "./components/Output";
import { Preview } from "./components/Preview";

function App() {
  const [backgroundHtml, setBackgroundHtml] = useState<string>("");
  const [backgroundCss, setBackgroundCss] = useState<string>("");

  const handleBackgroundGenerated = (html: string, css: string) => {
    setBackgroundHtml(html);
    setBackgroundCss(css);

    const styledElement = document.createElement("style");
    styledElement.innerHTML = css;
    document.head.appendChild(styledElement);
  };

  return (
    <>

    {backgroundHtml && (
      <div className="fixed inset-0 -z-10" dangerouslySetInnerHTML={{__html: backgroundHtml}}></div>
    )}

      <Header
        title={"Magic Background"}
        subtitle={
          " Transform your ideas into incredible backgrounds with the power of AI.Describe what you imagine and watch the magic happen."
        }
      />
      <Main onBackgroundGenerated={handleBackgroundGenerated}>
        <CodeOutput htmlCode={backgroundHtml} cssCode={backgroundCss}/>
      </Main>
      <Preview />
    </>
  );
}

export default App;

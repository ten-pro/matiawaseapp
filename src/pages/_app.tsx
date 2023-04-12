import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Styles from "@/styles/App.module.css";
import "@/styles/globals.css"

const GlobalStyle = createGlobalStyle`
  // ここにグローバルなCSSを記述
`;

export default function App({ Component, pageProps }: AppProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const onResize = () => {
      const targetScale = Math.min(
        window.innerWidth / 414,
        window.innerHeight / 896
      );
      setScale(targetScale);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return (
    <ThemeProvider theme={{}}>
      <GlobalStyle />
      <div className={Styles.body}>
        <div className={Styles.container} style={{ transform: `scale(${scale}) translate(-50%,-50%)` }}>
          <Component {...pageProps} />
        </div>
      </div>
    </ThemeProvider>
  );
}

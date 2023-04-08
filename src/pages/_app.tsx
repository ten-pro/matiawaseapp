import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import styled from "styled-components";
import Styles from "@/styles/App.module.css";
import "@/styles/globals.css"

const Wrapper = styled.div.attrs<{ renderScale: number }>((p) => ({
  style: {
    transform: `scale(${p.renderScale}) translate(-50%,-50%)`,
  },
}))``;

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
    <div className={Styles.body}>
      <Wrapper className={Styles.container} {...{ renderScale: scale }}>
        <Component {...pageProps} />
      </Wrapper>
    </div>
  );
}

import { AppProps } from "next/app";
import styled, { createGlobalStyle, css } from "styled-components";
import { Layout } from "../components/Layout";

import "../components/reset.css";
import Head from "next/head";
import { black, mobileWidth } from "../components/styles";

const style = css`
  :root {
    font-size: 10px;
    font-family: "Open Sans", sans-serif;
    color: ${black};

    @media (min-width: ${mobileWidth}px) {
      font-size: 16px;
    }
  }

  a {
    color: ${black};
    text-decoration: none;
  }
`;

const GlobalStyle = createGlobalStyle`${style}`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;

import { AppProps } from "next/app";
import styled, { createGlobalStyle, css } from "styled-components";
import { Layout } from "../components/Layout";

import "../components/reset.css";
import Head from "next/head";
import { black } from "../components/styles";

const style = css`
  body {
    font-family: "Open Sans", sans-serif;
    color: ${black};
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

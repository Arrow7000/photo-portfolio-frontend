import { AppProps } from "next/app";
import { createGlobalStyle, css } from "styled-components";
import { Layout } from "../components/Layout";

import "../components/reset.css";
import Head from "next/head";
import { black, mobileWidth } from "../components/styles";
import { AuthProvider } from "../components/AuthProvider";

const style = css`
  :root {
    font-size: 16px;
    font-family: "Open Sans", sans-serif;
    color: ${black};
  }

  a {
    color: ${black};
    text-decoration: none;
  }
`;

const GlobalStyle = createGlobalStyle`${style}`;

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AuthProvider>
      {!router.pathname.startsWith("/admin") ? (
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
      ) : (
        <>
          <Head>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
          </Head>
          <Component {...pageProps} />
        </>
      )}
    </AuthProvider>
  );
}

export default MyApp;

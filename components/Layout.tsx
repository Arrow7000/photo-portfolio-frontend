import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  black,
  margin,
  mobileWidth,
  siteContentWidth,
  tabletWidth,
} from "./styles";
import Head from "next/head";

export const WidthConstrainer = styled.div`
  max-width: ${siteContentWidth}px;
  padding: 0 ${margin}px;
  margin: 0 auto;
`;

const HomeLink = styled.a`
  padding: 15px;
  font-size: 2rem;
  font-weight: 300;
  line-height: 1;
  text-transform: uppercase;
`;

const NavBar = styled.nav`
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: ${margin * 2}px;
`;

const ExternalLink = styled.a`
  font-size: 1.2rem;
  padding-left: ${margin}px;
  padding-right: ${margin}px;
  line-height: 1;
`;

const Hr = styled.hr`
  margin-top: 0;
  border-top-color: ${black};
`;

const PageContainer = styled.div``;

const FooterBar = styled.footer`
  font-size: 0.8rem;
  text-align: center;
  margin: ${margin * 3}px ${margin}px;
  text-transform: uppercase;
`;

const Middot = styled.span`
  margin: 0 ${margin / 2}px;

  @media (min-width: ${mobileWidth}px) {
    margin: 0 ${margin}px;
  }

  @media (min-width: ${tabletWidth}px) {
    margin: 0 ${margin * 2}px;
  }
`;

const FooterMiddot = () => <Middot>&middot;</Middot>;

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-145880995-2"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-145880995-2');
        `,
          }}
        />
      </Head>
      <WidthConstrainer>
        <NavBar>
          <Link href="/" passHref>
            <HomeLink>Home</HomeLink>
          </Link>
          <div>
            <ExternalLink href="https://instagram.com/arrow7000">
              Instagram
            </ExternalLink>
            <ExternalLink href="https://adler.dev">adler.dev</ExternalLink>
          </div>
        </NavBar>
        <Hr />
      </WidthConstrainer>
      <PageContainer>{children}</PageContainer>
      <FooterBar>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        <FooterMiddot /> <a href="https://instagram.com/arrow7000">Instagram</a>{" "}
        <FooterMiddot /> <a href="https://adler.dev">adler.dev</a>{" "}
        <FooterMiddot /> © Aron Adler 2022
      </FooterBar>
    </>
  );
};

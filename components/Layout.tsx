import { FC } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import {
  black,
  margin,
  mobileWidth,
  siteContentWidth,
  tabletWidth,
} from "./styles";
import Head from "next/head";
import { adlerDevUrl, instaUrl } from "./config";
import { getYear } from "./helpers";

type BreakingProps = { breaking?: boolean };

export const WidthConstrainer = styled.div`
  max-width: ${siteContentWidth}px;
  padding: 0 ${margin}px;
  margin: 0 auto;
`;

const HomeLink = styled.a`
  padding: 15px;
  font-weight: 300;
  font-size: 1.5rem;
  line-height: 1;
  text-transform: uppercase;

  @media (min-width: ${mobileWidth}px) {
    font-size: 2rem;
  }
`;

const NavBar = styled.nav`
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: ${margin * 2}px;
`;

const RightNavSection = styled.div`
  @media (max-width: ${mobileWidth}px) {
    /* It's too crowded to display these on mobile */
    display: none;
  }
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

const Middot = styled.span<BreakingProps>`
  margin: 0 ${margin / 2}px;

  ${({ breaking }) =>
    // This sneaky thing converts this middot to an invisible break, which means we can control where and when the footer list of links breaks and we can ensure that it doesn't display a hanging middot when it does break.
    breaking &&
    css`
      @media (max-width: ${mobileWidth - 1}px) {
        overflow: hidden;
        margin: 0;
        display: block;
        height: 0;
      }
    `}

  @media (min-width: ${mobileWidth}px) {
    margin: 0 ${margin}px;
  }

  @media (min-width: ${tabletWidth}px) {
    margin: 0 ${margin * 2}px;
  }
`;

const FooterMiddot = (p: BreakingProps) => <Middot {...p}>&middot;</Middot>;

export const Layout: FC = ({ children }) => {
  const year = getYear();
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
          <RightNavSection>
            <ExternalLink href={instaUrl}>Instagram</ExternalLink>
            <ExternalLink href={adlerDevUrl}>adler.dev</ExternalLink>
          </RightNavSection>
        </NavBar>
        <Hr />
      </WidthConstrainer>
      <PageContainer>{children}</PageContainer>
      <FooterBar>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        <FooterMiddot /> <a href={instaUrl}>Instagram</a> <FooterMiddot />{" "}
        <a href={adlerDevUrl}>adler.dev</a> <FooterMiddot breaking /> © Aron
        Adler {year}
      </FooterBar>
    </>
  );
};

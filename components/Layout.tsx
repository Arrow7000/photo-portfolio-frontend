import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import { black, margin } from "./styles";

const HomeLink = styled.a`
  padding: 15px;
  font-size: 3rem;
  font-weight: 300;
  line-height: 1;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: ${margin * 2}px;
`;

const ExternalLink = styled.a`
  font-size: 1.2rem;
  padding-left: ${margin}px;
  padding-right: ${margin}px;
`;

const Hr = styled.hr`
  margin-top: 0;
  border-top-color: ${black};
  margin-left: ${margin}px;
  margin-right: ${margin}px;
`;

const PageContainer = styled.div`
  margin: ${margin}px;
`;

export const Layout: FC = ({ children }) => {
  return (
    <div>
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
      <PageContainer>{children}</PageContainer>
    </div>
  );
};

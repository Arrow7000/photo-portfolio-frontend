import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";

const TransparentLink = styled.a`
  display: contents;
  text-decoration: inherit;
`;

/**
 * Next Link without its own style and with href just working
 */
export const NextLink: FC<PropsOf<typeof Link>> = ({ children, ...props }) => (
  <Link passHref {...props}>
    <TransparentLink>{children}</TransparentLink>
  </Link>
);

import styled from "styled-components";

export const PhotoPreview = styled.div<{ src?: string }>`
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  padding-top: calc(100% * (9 / 16)); // to get 16/9 ratio
`;

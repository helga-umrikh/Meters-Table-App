import { type ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
  max-width: 1440px;
  margin: 0 auto;
  box-sizing: border-box;
  flex: 1;
`;

export default function PageWrapper({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

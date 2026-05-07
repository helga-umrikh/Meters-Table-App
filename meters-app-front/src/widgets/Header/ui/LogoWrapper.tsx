import { type ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  right: 64px;
  top: 50%;
  transform: translateY(-50%);
  width: 120px;
  height: 120px;
`;

export function LogoWrapper({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

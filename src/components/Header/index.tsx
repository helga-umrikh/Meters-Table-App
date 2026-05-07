import styled from 'styled-components';

import Logo from '../../assets/logo.svg?react';

import LogoWrapper from './LogoWrapper';

const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  height: 200px;
  flex-shrink: 0;
  background-color: #000000;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
    </HeaderContainer>
  );
}

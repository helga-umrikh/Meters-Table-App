import styled from 'styled-components';

import { HomePage } from '@/pages/Home';
import { Header } from '@/widgets/Header';

import { GlobalStyles } from './styles/global';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export function App() {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <HomePage />
      </AppContainer>
    </>
  );
}

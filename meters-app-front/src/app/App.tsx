import styled from 'styled-components';

import { HomePage } from '@/pages/Home';
import { Header } from '@/widgets/Header';

import { StoreProvider } from './store';
import { GlobalStyles } from './styles/global';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export function App() {
  return (
    <StoreProvider>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <HomePage />
      </AppContainer>
    </StoreProvider>
  );
}

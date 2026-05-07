import styled from 'styled-components';
import Header from '@/components/Header';
import HomePage from './pages/Home';
import GlobalStyles from './styles/GlobalStyles';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default function App() {
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

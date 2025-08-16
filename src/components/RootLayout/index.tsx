import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { HomeContainer } from './styles';

export function RootLayout() {
  return (
    <>
        <Header />
        <HomeContainer>
          <main>
            <Outlet />  
          </main>
        </HomeContainer>
    </>
  );
}
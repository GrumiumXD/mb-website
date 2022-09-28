import { Outlet } from 'react-router-dom';

import styled from 'styled-components';
import ErrorPage from '../ErrorPage';
import Header from './Header';
import Menu from './menu/Menu';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

type Props = {
  error?: boolean;
};

const Layout = (props: Props) => {
  return (
    <Container>
      <Menu />

      <div style={{ width: '100%' }}>
        <Header />
        {props?.error && <ErrorPage />}
        {!props?.error && <Outlet />}
      </div>
    </Container>
  );
};

export default Layout;

import { Outlet } from 'react-router-dom';

import styled from 'styled-components';
import ErrorPage from '../ErrorPage';
import Menu from './Menu';

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

      <div>
        {props?.error && <ErrorPage />}
        {!props?.error && <Outlet />}
      </div>
    </Container>
  );
};

export default Layout;

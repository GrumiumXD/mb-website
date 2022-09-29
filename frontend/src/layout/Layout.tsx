import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

import { TabletThreshold, Tablet, Mobile } from './responsive';

import Container from '../components/Container';
import ErrorPage from '../pages/ErrorPage';
import Header from './Header';
import Menu from './menu/Menu';
import DialogMenu from './menu/DialogMenu';

const Grid = styled.div`
  display: grid;
  min-height: 100vh;
  gap: var(--spacing-m);
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header'
    'main'
    'footer'
    'menu';

  @media (min-width: ${TabletThreshold}px) {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      'menu header'
      'menu main'
      'menu footer';
  }
`;

const Main = styled.main`
  grid-area: main;
`;

type Props = {
  error?: boolean;
};

const Layout = (props: Props) => {
  return (
    <Grid>
      <Header />
      <Main>
        <Container>
          {props?.error && <ErrorPage />}
          {!props?.error && <Outlet />}
        </Container>
      </Main>
      <Tablet>
        <Menu />
      </Tablet>
      <Mobile>
        <DialogMenu />
      </Mobile>
    </Grid>
  );
};

export default Layout;

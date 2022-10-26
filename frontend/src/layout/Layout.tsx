import { Outlet } from 'react-router-dom';

import Div100vh from 'react-div-100vh';

import styled from 'styled-components';

import { TabletThreshold, Tablet, Mobile } from './responsive';

import ErrorPage from '../pages/ErrorPage';
import Header from './Header';
import Menu from './menu/Menu';
import DialogMenu from './menu/DialogMenu';
import { LoaderMedium } from '../components/Loader';
import { Suspense } from 'react';

const Grid = styled.div`
  display: grid;
  height: 100%;
  gap: var(--spacing-m);
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
    'header header header'
    '. main .'
    '. . .';

  @media (min-width: ${TabletThreshold}px) {
    grid-template-areas:
      'menu header .'
      'menu main .'
      'menu . .';
  }
`;

const Main = styled.main`
  grid-area: main;
  width: 100%;
  max-width: 1100px;
  justify-self: center;
  overflow: hidden;
  height: 100%;
`;

type Props = {
  error?: boolean;
};

const Layout = (props: Props) => {
  return (
    <Div100vh>
      <Grid>
        <Header />
        <Main>
          <Suspense fallback={<LoaderMedium />}>
            {props?.error && <ErrorPage />}
            {!props?.error && <Outlet />}
          </Suspense>
        </Main>
        {/* <Footer /> */}
        <Tablet>
          <Menu />
        </Tablet>
        <Mobile>
          <DialogMenu />
        </Mobile>
      </Grid>
    </Div100vh>
  );
};

export default Layout;

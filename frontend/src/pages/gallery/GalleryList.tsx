import { useEffect, useRef } from 'react';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { SGalleryList } from '../../schemas';
import { Heading, Container } from '../../components/Parts';
import StyledNavLink from '../../components/StyledNavLink';
import { TabletThreshold } from '../../layout/responsive';

const MainGrid = styled.div`
  display: grid;
  gap: var(--spacing-m);
  height: 100%;
  overflow: auto;

  grid-template-rows: 1fr min-content;
  align-items: start;

  grid-template-columns: 1fr;
  grid-template-areas:
    'gallery'
    'selection';

  @media (min-width: ${TabletThreshold}px) {
    grid-template-rows: auto;
    grid-template-columns: 15em 1fr;
    grid-template-areas: 'selection gallery';
  }
`;

// const Grid = styled.div`
//   display: grid;
//   gap: var(--spacing-m);
//   height: 100%;

//   grid-template-rows: min-content 1fr min-content;

//   & > :nth-child(2) {
//     grid-row: 3 / 4;
//   }

//   @media (min-width: ${TabletThreshold}px) {
//     grid-template-rows: auto;
//     grid-template-columns: 15em 1fr;

//     & > :first-child {
//       grid-column: span 2;
//     }

//     & > :nth-child(2) {
//       grid-row: auto;
//     }
//   }
// `;

const NavList = styled.div`
  padding: var(--spacing-xs);
  display: flex;
  gap: var(--spacing-s);
  overflow: auto;

  & > * {
    white-space: nowrap;
  }

  @media (min-width: ${TabletThreshold}px) {
    flex-direction: column;

    & > * {
      white-space: normal;
    }
  }
`;

type Props = {};

const GalleryList = (props: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const data = useLoaderData();
  const galleries = SGalleryList.parse(data);
  const { t } = useTranslation('gallery');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if no gallery is selected switch to the first one
    if (pathname === '/gallery') {
      navigate('/gallery/0');
    }

    // scroll the gallery container to the top everytime a new album is selected
    if (ref.current) {
      ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  const Links = galleries.map((g, index) => (
    <StyledNavLink key={index} to={`${index}`}>
      {g}
    </StyledNavLink>
  ));

  return (
    <MainGrid>
      <Container style={{ gridArea: 'selection' }}>
        <Heading>{t('heading')}</Heading>
        <NavList>{Links}</NavList>
      </Container>
      <Container ref={ref} style={{ gridArea: 'gallery' }}>
        <Outlet />
      </Container>
    </MainGrid>
  );
};

export default GalleryList;

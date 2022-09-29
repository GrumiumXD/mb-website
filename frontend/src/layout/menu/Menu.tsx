import styled from 'styled-components';

import StyledNavLink from './StyledNavLink';
import { Tablet, TabletThreshold } from '../responsive';

import banner from './banner.png';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--main-color);
  box-shadow: var(--box-shadow-m);

  grid-area: menu;
`;

const MenuHeader = styled.h1`
  text-align: center;
  font-family: 'Ballantines Bold';
  font-weight: normal;
  font-size: 3em;
`;

const Banner = styled.img`
  margin: 0.5em;
  max-width: 100%;
`;

type Props = {};

const Menu = (props: Props) => {
  return (
    <StyledNav>
      <MenuHeader>Menu</MenuHeader>
      <StyledNavLink to={'/'} end>
        Über uns
      </StyledNavLink>
      <StyledNavLink to={'images'}>Galerie</StyledNavLink>
      <StyledNavLink to={'songs'}>Live-Mitschnitte</StyledNavLink>
      <StyledNavLink to={'interested'}>Mitspielen?</StyledNavLink>
      <StyledNavLink to={'press'}>Presse</StyledNavLink>
      <StyledNavLink to={'contact'}>Kontakt</StyledNavLink>
      <Tablet>
        <Banner src={banner} alt="banner" />
      </Tablet>
    </StyledNav>
  );
};

export default Menu;

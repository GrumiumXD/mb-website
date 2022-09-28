import styled from 'styled-components';

import StyledNavLink from './StyledNavLink';

import banner from './banner.png';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ffb74c;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.3);
`;

const MenuHeader = styled.h1`
  text-align: center;
  font-family: 'Ballantines Bold';
  font-weight: normal;
  font-size: 3em;
`;

const Banner = styled.img`
  margin: 0.5em;
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
      <Banner src={banner} alt="banner" />
    </StyledNav>
  );
};

export default Menu;

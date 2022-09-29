import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import StyledNavLink from './StyledNavLink';
import { Tablet } from '../responsive';

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
  const { t } = useTranslation('menu');

  return (
    <StyledNav>
      <MenuHeader>{t('header')}</MenuHeader>
      <StyledNavLink to={'/'} end>
        {t('about')}
      </StyledNavLink>
      <StyledNavLink to={'images'}>{t('images')}</StyledNavLink>
      <StyledNavLink to={'songs'}>{t('songs')}</StyledNavLink>
      <StyledNavLink to={'interested'}>{t('interested')}</StyledNavLink>
      <StyledNavLink to={'press'}>{t('press')}</StyledNavLink>
      <StyledNavLink to={'contact'}>{t('contact')}</StyledNavLink>
      <Tablet>
        <Banner src={banner} alt="banner" />
      </Tablet>
    </StyledNav>
  );
};

export default Menu;

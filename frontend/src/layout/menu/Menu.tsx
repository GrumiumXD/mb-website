import { MouseEvent } from 'react';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import StyledNavLink from '../../components/StyledNavLink';
import { Tablet } from '../responsive';

import banner from './banner.png';
import flagDe from './flag-de.png';
import flagEn from './flag-en.png';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--main-color);
  box-shadow: var(--box-shadow-m);

  grid-area: menu;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: baseline;
`;

const FlagButton = styled.button`
  cursor: pointer;
  border: none;
  overflow: hidden;
  border-radius: 0.25em;
  box-shadow: var(--box-shadow-l);
  outline: none;
  padding: 0;
  width: 40px;

  &:active {
    transform: scale(0.95, 0.95);
    box-shadow: none;
  }

  &:focus-visible {
    outline: 0.125em solid red;
  }

  & img {
    display: block;
    width: inherit;
  }
`;

const MenuHeader = styled.h2`
  margin-block: 0.5em;
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
  const { t, i18n } = useTranslation('menu');

  // language switch event
  const switchLanguage = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget instanceof HTMLButtonElement) {
      const attributes = e.currentTarget.attributes;
      const label = attributes.getNamedItem('aria-label');

      if (label != null) {
        if (label.value === 'German') {
          i18n.changeLanguage('de');
        } else {
          i18n.changeLanguage('en');
        }
      }
    }
  };

  return (
    <StyledNav>
      <Header>
        <FlagButton onClick={switchLanguage} aria-label="German">
          <img src={flagDe} alt="german" aria-hidden="true" />
        </FlagButton>
        <MenuHeader>{t('heading')}</MenuHeader>
        <FlagButton onClick={switchLanguage} aria-label="English">
          <img src={flagEn} alt="english" aria-hidden="true" />
        </FlagButton>
      </Header>
      <StyledNavLink menu to={'/'} end>
        {t('about')}
      </StyledNavLink>
      <StyledNavLink menu to={'gallery'}>
        {t('gallery')}
      </StyledNavLink>
      <StyledNavLink menu to={'songs'}>
        {t('songs')}
      </StyledNavLink>
      <StyledNavLink menu to={'interested'}>
        {t('interested')}
      </StyledNavLink>
      <StyledNavLink men to={'press'}>
        {t('press')}
      </StyledNavLink>
      <StyledNavLink menu to={'contact'}>
        {t('contact')}
      </StyledNavLink>
      <Tablet>
        <Banner src={banner} alt="banner" />
      </Tablet>
    </StyledNav>
  );
};

export default Menu;

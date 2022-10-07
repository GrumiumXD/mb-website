import styled from 'styled-components';
import { GrMenu } from 'react-icons/gr';

import { TabletThreshold, Mobile } from './responsive';
import { useMenuStore } from '../store';

import BaseButtonStyle from '../components/BaseButtonStyle';

const HeaderBar = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: header;

  @media (min-width: ${TabletThreshold}px) {
    padding-top: var(--spacing-m);
  }
`;

const LogoBox = styled.div`
  background: linear-gradient(
    #7c4a17 0%,
    #ffb128 5%,
    #ffffff 45%,
    #ffffff 55%,
    #ffb128 95%,
    #7c4a17 100%
  );
  height: max(3.6em, min(12vw, 8em));
  display: grid;
  place-content: center;
  place-items: center;
  grid-template-columns: 1fr auto;
  /* padding-inline: var(--spacing-xxl); */
  position: relative;

  width: 100%;

  @media (min-width: ${TabletThreshold}px) {
    margin-inline: max(1.8em, min(6vw, 4em));
    padding-inline: 0;
    width: auto;

    &::before,
    &::after {
      content: '';
      z-index: -1;
      position: absolute;
      top: 0;
      bottom: 0;
      width: max(3.6em, min(12vw, 8em));
      background: radial-gradient(
        closest-side,
        #ffffff 0%,
        #ffffff 10%,
        #ffb128 90%,
        #7c4a17 100%
      );
      border-radius: 10em;
    }

    &::before {
      left: calc(-1 * max(1.8em, min(6vw, 4em)));
    }
    &::after {
      right: calc(-1 * max(1.8em, min(6vw, 4em)));
    }
  }
`;

const Logo = styled.h1`
  font-family: 'Ballantines Bold';
  font-weight: normal;
  color: #d0011b;
  font-size: max(3.6em, min(12vw, 8em));
  line-height: 0.75em;
  padding-bottom: 0.2em;
  padding-left: 0.1em;
  margin: 0;
  white-space: nowrap;
`;

const Button = styled.button`
  ${BaseButtonStyle}

  display: grid;
  place-content: center;
`;

interface Props {}

const Header = (props: Props) => {
  const setOpen = useMenuStore((state) => state.setOpen);
  const openMenu = () => setOpen(true);

  return (
    <HeaderBar>
      <LogoBox>
        <Logo>Märkisch-Blech</Logo>
        <Mobile>
          <Button onClick={openMenu}>
            <GrMenu size={20} />
          </Button>
        </Mobile>
      </LogoBox>
    </HeaderBar>
  );
};

export default Header;

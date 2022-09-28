import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 10em;
  height: 100%;
  background-color: aliceblue;
`;

const StyledNavLink = styled(NavLink)`
  border: 1px solid black;
  background-color: beige;

  &.active {
    background-color: blanchedalmond;
  }
`;

type Props = {};

const Menu = (props: Props) => {
  return (
    <StyledNav>
      <StyledNavLink to={'/'} end>
        Über uns
      </StyledNavLink>
      <StyledNavLink to={'galerie'}>Galerie</StyledNavLink>
    </StyledNav>
  );
};

export default Menu;

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import BaseButtonStyle from '../../components/BaseButtonStyle';

const StyledNavLink = styled(NavLink).attrs(() => ({
  tabIndex: '0',
}))`
  ${BaseButtonStyle}

  text-transform: uppercase;
  text-decoration: none;
`;

export default StyledNavLink;

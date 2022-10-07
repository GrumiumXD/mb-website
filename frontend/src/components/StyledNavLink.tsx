import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import BaseButtonStyle from './BaseButtonStyle';

interface Props {
  menu?: boolean;
}

const StyledNavLink = styled(NavLink).attrs(() => ({
  tabIndex: '0',
}))<Props>`
  ${BaseButtonStyle}
  text-decoration: none;

  ${(props) => {
    if (props.menu) {
      return css`
        white-space: nowrap;
        text-transform: uppercase;
      `;
    } else {
      return css`
        font-size: 0.75em;
        margin: 0;
      `;
    }
  }}
`;

export default StyledNavLink;

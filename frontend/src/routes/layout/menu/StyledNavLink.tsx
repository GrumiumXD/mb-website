import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink).attrs(() => ({
  tabindex: '0',
}))`
  font-family: 'Roboto';
  text-align: center;
  border: none;
  border-radius: 0.125em;
  padding: 0.5em 0.5em;
  margin: 0.5em;
  font-size: 1em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.5);
  outline: none;
  white-space: nowrap;

  background-color: #ffc560;
  color: black;

  &.active {
    background-color: #d68800;
  }

  background-position: center;
  transition: background 0.8s;

  &:hover {
    background: #d68800 radial-gradient(circle, transparent 1%, #d68800 1%)
      center/15000%;
  }

  &:active {
    background-color: #fce8c5;
    background-size: 100%;
    transition: background 0s;
  }

  &:focus-visible {
    outline: 0.125em solid red;
  }
`;

export default StyledNavLink;

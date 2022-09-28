import styled from 'styled-components';

const HeaderBar = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoBox = styled.div`
  background-color: #ffb128; /* For browsers that do not support gradients */
  background: linear-gradient(
    #7c4a17 0%,
    #ffb128 5%,
    #ffffff 45%,
    #ffffff 55%,
    #ffb128 95%,
    #7c4a17 100%
  );
  height: 8em;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-inline: 4em;

  &::before,
  &::after {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 8em;
    background-color: #ffb128; /* For browsers that do not support gradients */
    background: radial-gradient(
      closest-side,
      #ffffff 0%,
      #ffffff 10%,
      #ffb128 90%,
      #7c4a17 100%
    );
    border-radius: 5em;
  }

  &::before {
    left: -4em;
  }
  &::after {
    right: -4em;
  }
`;

const Logo = styled.h5`
  font-family: 'Ballantines Bold';
  font-weight: normal;
  color: #d0011b;
  font-size: 8em;
  margin: 0.0625em 0 0.25em 0;
  white-space: nowrap;
`;

interface Props {}

const Header = (props: Props) => {
  return (
    <HeaderBar>
      <LogoBox>
        <Logo>Märkisch-Blech</Logo>
        {/* <Menu /> */}
      </LogoBox>
    </HeaderBar>
  );
};

export default Header;

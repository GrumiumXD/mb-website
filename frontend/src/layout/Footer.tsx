import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: block;
  grid-area: footer;
  text-align: center;
  color: white;
  border: solid white;
  border-width: 1px 0 0 0;
  padding-top: var(--spacing-xxs);
`;

type Props = {};

const Footer = (props: Props) => {
  return <StyledFooter>© 2022 Märkisch-Blech </StyledFooter>;
};

export default Footer;

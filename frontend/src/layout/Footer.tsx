import styled from 'styled-components';

const StyledFooter = styled.footer`
  font-family: 'Roboto';
  display: block;
  margin: auto var(--spacing-xxs) var(--spacing-xxs) var(--spacing-xxs);
  text-align: center;
  color: black;
  border: solid black;
  border-width: 1px 0 0 0;
`;

type Props = {};

const Footer = (props: Props) => {
  return <StyledFooter>© 2022 Märkisch-Blech </StyledFooter>;
};

export default Footer;

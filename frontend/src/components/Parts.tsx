import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  overflow: auto;
  height: 100%;
  background-color: var(--main-color-trans);
  padding-block: var(--spacing-xs);
  padding-inline: var(--spacing-l);
  margin: 0;
  border-radius: 0.5em;
  box-shadow: var(--box-shadow-m);
`;

export const Paragraph = styled.p`
  font-family: 'Roboto';
  text-align: justify;
  line-height: 1.5;
`;

export const Heading = styled.h3`
  font-family: 'Ballantines Bold';
  font-size: 2.5em;
  margin: 0;
  text-align: center;
`;

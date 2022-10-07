import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Heading, Container, Paragraph } from '../../components/Parts';

import band from './band.jpg';

const Grid = styled.div`
  display: grid;
  gap: var(--spacing-m);
`;

const BandImage = styled.img`
  justify-self: center;
  width: max(280px, min(60%, 720px));
  box-shadow: var(--box-shadow-m);
`;

type Props = {};

const About = (props: Props) => {
  const { t } = useTranslation('about');

  return (
    <Container>
      <Grid>
        <Heading>{t('heading')}</Heading>
        <BandImage src={band} alt="band" />
        <Paragraph>{t('p1')}</Paragraph>
        <Paragraph>{t('p2')}</Paragraph>
      </Grid>
    </Container>
  );
};

export default About;

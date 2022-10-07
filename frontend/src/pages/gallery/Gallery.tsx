import { useLoaderData } from 'react-router';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { SGallery } from '../../schemas';
import { Heading, Container } from '../../components/Parts';
import StyledNavLink from '../../components/StyledNavLink';
import { TabletThreshold } from '../../layout/responsive';

const ImageGrid = styled.div`
  display: grid;
  gap: var(--spacing-m);
  /* overflow: auto;
  height: 100%; */
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 0.5em;
  box-shadow: var(--box-shadow-l);
`;

type Props = {};

const Gallery = (props: Props) => {
  const data = useLoaderData();
  const imageLinks = SGallery.parse(data);

  const images = imageLinks.map((i, index) => (
    <Image src={`/media/${i}`} key={index} />
  ));

  return <ImageGrid>{images}</ImageGrid>;
};

export default Gallery;

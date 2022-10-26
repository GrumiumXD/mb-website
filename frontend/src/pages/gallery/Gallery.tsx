import { useLoaderData } from 'react-router';
import styled from 'styled-components';

import { useMediaQuery } from 'react-responsive';

import { DesktopSThreshold, DesktopMThreshold } from '../../layout/responsive';

import { Gallery as GallerySchema } from '../../api/schemas';

type GProps = {
  columns: number;
};

const ImageGrid = styled.div<GProps>`
  display: block;
  column-count: ${(props) => props.columns};
  column-gap: var(--spacing-xs);
  line-height: 0;

  & > * {
    margin-top: var(--spacing-xs);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5em;
  box-shadow: var(--box-shadow-l);
`;

const getColumnCount = (small: boolean, medium: boolean, c: number): number => {
  if (small) {
    return 1;
  }

  if (medium) {
    if (c > 3) {
      return 2;
    }
    return 1;
  }

  if (c > 5) {
    return 3;
  }

  if (c > 3) {
    return 2;
  }

  return 1;
};

type Props = {};

const Gallery = (props: Props) => {
  const data = useLoaderData();
  const imageLinks = GallerySchema.parse(data);

  const isSmall = useMediaQuery({ maxWidth: DesktopSThreshold - 1 });
  const isMedium = useMediaQuery({ maxWidth: DesktopMThreshold - 1 });

  const columnCount = getColumnCount(isSmall, isMedium, imageLinks.length);

  const images = imageLinks.map((i, index) => (
    <Image key={index} src={`/media/${i}`} loading="lazy" />
  ));

  return <ImageGrid columns={columnCount}>{images}</ImageGrid>;
};

export default Gallery;

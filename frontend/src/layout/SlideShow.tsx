import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import Carousel, { Alignment } from 'nuka-carousel';

import styled from 'styled-components';
import { getSlideShowImages } from '../api/fetch';
import { LoaderMedium } from '../components/Loader';

const SlideShowContainer = styled.div`
  grid-area: slideshow;
  display: block;
  justify-self: center;
  max-width: 1000px;
`;

const Image = styled.img`
  max-height: 120px;
  display: block;
  margin-inline: auto;
  border-radius: 0.5em;
  box-shadow: var(--box-shadow-l);
`;

type Props = {};

const SlideShow = (props: Props) => {
  const { isLoading, isError, data, error } = useQuery(
    ['slideshow'],
    getSlideShowImages,
    { staleTime: Infinity }
  );

  if (isLoading) {
    return <LoaderMedium />;
  }

  if (isError) {
    return <span>Error: {error as any}</span>;
  }

  const images = data.map((d, index) => {
    return (
      <Link to={`/gallery/${d[0]}`}>
        <Image key={index} src={`/media/${d[1]}`} />
      </Link>
    );
  });

  return (
    <SlideShowContainer>
      <Carousel
        wrapAround={true}
        slidesToShow={5}
        autoplay={true}
        autoplayInterval={6000}
        speed={1000}
        cellAlign={Alignment.Center}
        withoutControls={true}
        animation="zoom"
        zoomScale={0.7}
      >
        {images}
      </Carousel>
    </SlideShowContainer>
  );
};

export default SlideShow;

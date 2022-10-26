import { useQuery } from '@tanstack/react-query';

import Carousel, { Alignment } from 'nuka-carousel';

import styled from 'styled-components';
import { getSlideShowImages } from '../api/fetch';
import { LoaderMedium } from '../components/Loader';

const SlideShowContainer = styled.div`
  grid-area: slideshow;
  display: block;
  /* display: flex; */
  /* align-items: center; */
  justify-self: center;
  /* width: 300px; */
  max-width: 1000px;
  /* display: flex;
  max-height: 30px;

  & > img {
    width: 100%;
  } */
`;

const Image = styled.img`
  max-height: 120px;
  display: block;
  margin-inline: auto;
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
    return <Image key={index} src={`/media/${d[1]}`} />;
  });

  return (
    <SlideShowContainer>
      <Carousel
        wrapAround={true}
        slidesToShow={5}
        autoplay={true}
        autoplayInterval={5000}
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

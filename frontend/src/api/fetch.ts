import { SlideShow } from './schemas';

export const getSlideShowImages = async () => {
  const result = await fetch('/api/slideshow');
  if (!result.ok) {
    throw new Error('network response was not ok');
  }

  const data = await result.json();
  const parsedData = SlideShow.parse(data);

  return parsedData;
};

import { z } from 'zod';

export const GalleryList = z.array(z.string());

export const Gallery = z.array(z.string());

export const SlideShow = z.array(z.tuple([z.number(), z.string()]));

import { BOOK_IMAGES_URL, FALLBACK_BOOK_COVER } from './book-api';

export function getBookImageUrl(imageName: string | null | undefined): string {
  if (!imageName) {
    return FALLBACK_BOOK_COVER;
  }

  if (imageName.startsWith('http')) {
    return imageName;
  }

  return `${BOOK_IMAGES_URL}${imageName}`;
}

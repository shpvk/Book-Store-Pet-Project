export interface Book {
  id: number;
  title: string;
  description?: string | null;
  price: number;
  image?: string | null;
}

export type CreateBookPayload = Omit<Book, 'id'>;
export type UpdateBookPayload = CreateBookPayload;

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BOOKS_API_URL } from './books/book-api';
import { Book, CreateBookPayload, UpdateBookPayload } from './books/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(BOOKS_API_URL);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${BOOKS_API_URL}/${id}`);
  }

  createBook(bookData: CreateBookPayload): Observable<Book> {
    return this.http.post<Book>(BOOKS_API_URL, bookData);
  }

  updateBook(id: number, bookData: UpdateBookPayload): Observable<Book | null> {
    return this.http.put<Book | null>(`${BOOKS_API_URL}?bookId=${id}`, bookData);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${BOOKS_API_URL}?bookId=${id}`);
  }
}

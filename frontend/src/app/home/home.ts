import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Добавили импорт
import { CommonModule } from '@angular/common';
import { BookService } from '../book.service';

export interface Book {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  errorMessage: string | null = null;
  imageBaseUrl = 'https://localhost:5000/images/books/';

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        console.log('Данные получены внутри компонента:', data);
        this.books = [...data];
        this.errorMessage = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Не удалось загрузить список книг.';
        console.error('Ошибка в компоненте:', err);
        this.cdr.detectChanges();
      }
    });
  }
}
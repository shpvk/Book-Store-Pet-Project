import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetails implements OnInit {
  book: any;
  imageBaseUrl: string = 'https://localhost:5000/images/books/';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    const id = +idParam; // Конвертируем строку в число с помощью '+'
    this.bookService.getBookById(id).subscribe({
      next: (data: any) => this.book = data,
      error: (err: any) => console.error(err)
    });
  }
  }
}
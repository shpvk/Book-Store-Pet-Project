import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  books: any[] = [];
  errorMessage: string | null = null;
  imageBaseUrl: string = 'https://localhost:5000/images/books/';

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = [...data];
        this.errorMessage = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Could not load the catalog. Please try again later.';
        console.error(err);
        this.cdr.detectChanges();
      }
    });
  }
}
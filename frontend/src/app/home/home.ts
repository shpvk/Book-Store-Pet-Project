import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
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
  activeMenuId: number | null = null;

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

  toggleMenu(id: number, event: Event): void {
    event.stopPropagation();
    this.activeMenuId = this.activeMenuId === id ? null : id;
  }

  @HostListener('document:click')
  closeMenu(): void {
    this.activeMenuId = null;
  }

  getBookImage(imageName: string): string {
    if (!imageName) return 'assets/no-cover.png';
    if (imageName.startsWith('http')) return imageName;
    return `${this.imageBaseUrl}${imageName}`;
  }
}
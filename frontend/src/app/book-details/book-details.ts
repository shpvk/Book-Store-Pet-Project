import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../book.service';
import { getBookImageUrl } from '../books/book-image';
import { Book } from '../books/book.model';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly bookService = inject(BookService);

  readonly book = signal<Book | null>(null);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isFinite(id)) {
      this.errorMessage.set('Book was not found.');
      return;
    }

    this.bookService.getBookById(id).subscribe({
      next: (data) => {
        this.book.set(data);
        this.errorMessage.set(null);
      },
      error: (err: unknown) => {
        this.errorMessage.set('Could not load book details.');
        console.error(err);
      }
    });
  }

  getBookImage(imageName: string | null | undefined): string {
    return getBookImageUrl(imageName);
  }
}

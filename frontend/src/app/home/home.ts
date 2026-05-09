import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { getBookImageUrl } from '../books/book-image';
import { Book, UpdateBookPayload } from '../books/book.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private readonly bookService = inject(BookService);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly books = signal<Book[]>([]);
  readonly errorMessage = signal<string | null>(null);
  readonly activeMenuId = signal<number | null>(null);
  readonly editingBook = signal<Book | null>(null);
  readonly viewingBook = signal<Book | null>(null);
  readonly isSaving = signal(false);
  readonly editErrorMessage = signal<string | null>(null);

  readonly editForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(1)]],
    image: ['']
  });

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books.set([...data]);
        this.errorMessage.set(null);
      },
      error: (err: unknown) => {
        this.errorMessage.set('Could not load the catalog. Please try again later.');
        console.error(err);
      }
    });
  }

  openEditModal(book: Book, event: Event): void {
    event.stopPropagation();
    this.activeMenuId.set(null);
    this.viewingBook.set(null);
    this.editErrorMessage.set(null);
    this.editingBook.set(book);
    this.editForm.reset({
      title: book.title,
      description: book.description,
      price: book.price,
      image: book.image ?? ''
    });
  }

  closeEditModal(): void {
    if (this.isSaving()) {
      return;
    }

    this.editingBook.set(null);
    this.editErrorMessage.set(null);
    this.editForm.reset();
  }

  openDetailsModal(book: Book, event: Event): void {
    event.stopPropagation();
    this.activeMenuId.set(null);
    this.editingBook.set(null);
    this.viewingBook.set(book);
  }

  closeDetailsModal(): void {
    this.viewingBook.set(null);
  }

  saveBookChanges(): void {
    const book = this.editingBook();

    if (!book) {
      return;
    }

    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const payload: UpdateBookPayload = this.editForm.getRawValue();
    this.isSaving.set(true);
    this.editErrorMessage.set(null);

    this.bookService.updateBook(book.id, payload).subscribe({
      next: (updatedBook) => {
        const savedBook: Book = updatedBook ?? { id: book.id, ...payload };

        this.books.update(books =>
          books.map(currentBook => currentBook.id === savedBook.id ? savedBook : currentBook)
        );
        this.isSaving.set(false);
        this.editingBook.set(null);
        this.editForm.reset();
      },
      error: (err: unknown) => {
        this.isSaving.set(false);
        this.editErrorMessage.set('Failed to update the book. Please try again.');
        console.error('Update failed:', err);
      }
    });
  }

  onDeleteBook(id: number, event: Event): void {
    event.stopPropagation();

    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.books.update(books => books.filter(book => book.id !== id));
          this.activeMenuId.set(null);
        },
        error: (err: unknown) => {
          console.error('Delete failed:', err);
          alert('Failed to delete the book. Check console for details.');
        }
      });
    }
  }

  toggleMenu(id: number, event: Event): void {
    event.stopPropagation();
    this.activeMenuId.update(activeId => activeId === id ? null : id);
  }

  @HostListener('document:click')
  closeMenu(): void {
    this.activeMenuId.set(null);
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.closeEditModal();
    this.closeDetailsModal();
  }

  getBookImage(imageName: string | null | undefined): string {
    return getBookImageUrl(imageName);
  }
}

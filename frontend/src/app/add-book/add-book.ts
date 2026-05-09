import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { CreateBookPayload } from '../books/book.model';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css'
})
export class AddBook {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly bookService = inject(BookService);
  readonly router = inject(Router);

  readonly bookForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(1)]],
    image: ['example.jpg']
  });

  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const payload: CreateBookPayload = this.bookForm.getRawValue();

    this.bookService.createBook(payload).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err: unknown) => console.error(err)
    });
  }
}

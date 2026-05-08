import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css'
})
export class AddBook {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    public router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(1)]],
      image: ['example.jpg']
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.bookService.createBook(this.bookForm.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => console.error(err)
      });
    }
  }
}
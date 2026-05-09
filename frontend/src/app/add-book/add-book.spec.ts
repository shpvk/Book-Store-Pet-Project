import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { BookService } from '../book.service';
import { AddBook } from './add-book';

describe('AddBook', () => {
  let component: AddBook;
  let fixture: ComponentFixture<AddBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBook],
      providers: [
        provideRouter([]),
        {
          provide: BookService,
          useValue: {
            createBook: () => of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBook);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

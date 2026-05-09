import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { BookService } from '../book.service';
import { BookDetails } from './book-details';

describe('BookDetails', () => {
  let component: BookDetails;
  let fixture: ComponentFixture<BookDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetails],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            }
          }
        },
        {
          provide: BookService,
          useValue: {
            getBookById: () => of({
              id: 1,
              title: 'Test Book',
              description: 'Test description',
              price: 100,
              image: null
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

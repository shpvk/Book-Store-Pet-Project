import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contacts } from './contacts/contacts';
import { AddBook } from './add-book/add-book';
import { BookDetails } from './book-details/book-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contacts', component: Contacts },
  { path: 'add', component: AddBook },
  { path: 'book/:id', component: BookDetails }
];
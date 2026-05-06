import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contacts } from './contacts/contacts';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contacts', component: Contacts }
];
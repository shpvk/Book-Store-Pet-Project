import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Theme {
  isDarkMode = signal<boolean>(localStorage.getItem('theme') === 'dark');

  toggleTheme() {
    this.isDarkMode.update(dark => !dark);
    const mode = this.isDarkMode() ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
    this.applyTheme(mode);
  }

  applyTheme(mode: string) {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }

  initTheme() {
    this.applyTheme(this.isDarkMode() ? 'dark' : 'light');
  }
}
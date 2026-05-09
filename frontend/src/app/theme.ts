import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class Theme {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly isDarkMode = signal<boolean>(this.getStoredTheme() === 'dark');

  toggleTheme(): void {
    this.isDarkMode.update(dark => !dark);
    const mode: ThemeMode = this.isDarkMode() ? 'dark' : 'light';

    if (this.isBrowser) {
      localStorage.setItem('theme', mode);
    }

    this.applyTheme(mode);
  }

  applyTheme(mode: ThemeMode): void {
    const classList = this.document.documentElement.classList;

    if (mode === 'dark') {
      classList.add('dark-theme');
    } else {
      classList.remove('dark-theme');
    }
  }

  initTheme(): void {
    this.applyTheme(this.isDarkMode() ? 'dark' : 'light');
  }

  private getStoredTheme(): ThemeMode {
    if (!this.isBrowser) {
      return 'light';
    }

    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  }
}

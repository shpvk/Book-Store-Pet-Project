import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  books = [
    {
      title: 'Грокаем алгоритмы',
      author: 'Адитья Бхаргава',
      price: 650,
      image: 'book/algorithms.jpg'
    },
    {
      title: 'Чистая архитектура',
      author: 'Роберт Мартин',
      price: 800,
      image: 'book/architecture.jpg'
    },
    {
      title: 'Код: тайный язык информатики',
      author: 'Чарльз Петцольд',
      price: 950,
      image: 'book/code.jpg'
    },
    {
      title: 'Язык программирования C++',
      author: 'Бьерн Страуструп',
      price: 1100,
      image: 'book/cpp.jpg'
    }
  ];
}
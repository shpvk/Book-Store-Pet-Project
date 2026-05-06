using BookStore.Domain.Models;
using BookStore.Domain.Repository;
using System.Linq;

namespace BookStore.Infrastructure
{
    public class BookRepository : IBookRepository
    {

        private readonly Book[] books = new[]
        {
            Book.Create(1, "Грокаем алгоритмы", "описание", 1200).Book!,
            Book.Create(2, "Чистая архитектура", "описание", 1200).Book!,
            Book.Create(3, "Код: тайный язык информатики", "описание", 1200).Book!,
            Book.Create(4, "Язык программирования C++", "описание", 1200).Book!,
        };


        Book[] BetAllByTitle(string titlePart)
        {
            return books.Where(book => book.Title.Contains(titlePart))
                .ToArray();
        }
    }
}

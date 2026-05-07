using BookStore.Domain.Models;
using BookStore.Domain.Repository;
using System.Linq;

namespace BookStore.Infrastructure.Repositories
{
    public class BookRepository : IBookRepository
    {

        private readonly Book[] books = new[]
        {
            Book.Create(1, "Грокаем алгоритмы", "описание", 800, "algorithms.jpg").Book!,
            Book.Create(2, "Чистая архитектура", "описание", 1250, "architecture.jpg").Book!,
            Book.Create(3, "Код: тайный язык информатики", "описание", 1100, "code.jpg").Book!,
            Book.Create(4, "Язык программирования C++", "описание", 1090, "cpp.jpg").Book!,
        };

        public IEnumerable<Book> GetBooks()
        {
            return books;
        }

        Book[] GetAllByTitle(string titlePart)
        {
            return books.Where(book => book.Title.Contains(titlePart))
                .ToArray();
        }
    }
}

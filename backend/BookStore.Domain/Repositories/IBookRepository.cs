using BookStore.Domain.Models;

namespace BookStore.Domain.Repository
{
    public interface IBookRepository
    {
        public IEnumerable<Book> GetBooks();
    }
}
/*
     GetById
     Create
     Update
     Delete
 */
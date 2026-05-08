using BookStore.Domain.Models;

namespace BookStore.Domain.Repository
{
    public interface IBookRepository
    {
        public Task<List<Book>> GetBooksAsync();
        public Task<Book> AddAsync(Book book);

        public Task DeleteAsync(int id);
    }
}
/*
     GetById
     Create
     Update
     Delete
 */
using BookStore.Domain.Models;
using System.Security.Cryptography.X509Certificates;

namespace BookStore.Domain.Repository
{
    public interface IBookRepository
    {
        public Task<List<Book>> GetBooksAsync();
        public Task<Book> AddAsync(Book book);

        public Task DeleteAsync(int id);

        public Task<Book?> FindById(int bookId);

        public Task SaveChangesAsync();
    }
}
/*
     GetById
     Create
     Update
     Delete
 */
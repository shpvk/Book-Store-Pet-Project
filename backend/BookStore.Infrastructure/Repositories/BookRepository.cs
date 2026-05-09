using BookStore.Domain.Models;
using BookStore.Domain.Repository;
using BookStore.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Infrastructure.Repositories
{
    public class BookRepository(BookContext bookContext) : IBookRepository
    {
        public async Task<List<Book>> GetBooksAsync()
        {
            List<Book> books = await bookContext.Books.ToListAsync();
            return books;
        }
        public async Task<Book> AddAsync(Book book)
        {
            await bookContext.Books.AddAsync(book);
            await bookContext.SaveChangesAsync();
            return book;
        }

        public async Task DeleteAsync(int id)
        {
            await bookContext.Books
                .Where(book => book.Id == id)
                .ExecuteDeleteAsync();
        }

        public async Task<Book?> FindById(int bookId)
        {
            return await bookContext.Books
                .Where(book => book.Id == bookId)
                .FirstOrDefaultAsync();
        }

        public async Task SaveChangesAsync()
        {
            await bookContext.SaveChangesAsync();
        }


    }

}

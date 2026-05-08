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

    }

}

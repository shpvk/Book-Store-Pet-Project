using BookStore.Application.DTOs;
using BookStore.Domain.Models;

namespace BookStore.Application.Interfaces
{
    public interface IBookService
    {
        Task<List<BookResponse>> GetBooksAsync();
        Task<BookResponse> CreateBookAsync(CreateBookRequest createBookRequest);
        Task DeleteBookAsync(int id);
        Task UpdateBookAsync(int bookId, UpdateBookRequest updateBookRequest);

    }
}

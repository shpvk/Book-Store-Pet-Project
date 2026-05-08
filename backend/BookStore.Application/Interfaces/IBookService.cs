using BookStore.Application.DTOs;

namespace BookStore.Application.Interfaces
{
    public interface IBookService
    {
        Task<List<BookResponse>> GetBooksAsync();
        Task<BookResponse> CreateBookAsync(CreateBookRequest createBookRequest);
    }
}

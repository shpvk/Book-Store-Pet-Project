using BookStore.Application.DTOs;
using BookStore.Application.Interfaces;
using BookStore.Domain.Models;
using BookStore.Domain.Repository;
namespace BookStore.Application.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;

        public BookService(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }


        public async Task<List<BookResponse>> GetBooksAsync()
        {

            List<BookResponse> bookResponses = _bookRepository.GetBooks();
            List<BookResponse> booksDto = new BookResponse[books.Length];

            for (int i = 0; i < books.Length; ++i)
            {
                booksDto[i] = new BookResponse();
                booksDto[i].Id = books[i].Id;
                booksDto[i].Title = books[i].Title;
                booksDto[i].Price = books[i].Price;
                booksDto[i].Image = books[i].Image;
            }

            return booksDto;
        }

        public Task<BookResponse> CreateBookAsync(CreateBookRequest createBookRequest)
        {

        }

    }
}

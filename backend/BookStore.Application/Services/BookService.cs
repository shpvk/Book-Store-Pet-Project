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

            List<Book> books = await _bookRepository.GetBooksAsync();
            List<BookResponse> booksDto = new List<BookResponse>();

            foreach(Book book in books)
            {
                BookResponse bookResponse = new BookResponse();
                bookResponse.Title = book.Title;
                bookResponse.Id = book.Id;
                bookResponse.Price = book.Price;
                bookResponse.Image = book.Image;
                booksDto.Add(bookResponse);
            }
            return booksDto;
        }

        public async Task<BookResponse> CreateBookAsync(CreateBookRequest createBookRequest)
        {
            (Book? book, string ? Error) = Book.Create(createBookRequest.Title, createBookRequest.Description, createBookRequest.Price, createBookRequest.Image);


            if(Error != null)
            {
                throw new Exception(Error);
            }
            if(book == null)
            {
                throw new Exception(Error);
            }


            BookResponse bookResponse = new BookResponse();
            Book savedBook = await _bookRepository.AddAsync(book);

            bookResponse.Id = savedBook.Id;
            bookResponse.Title = savedBook.Title;
            bookResponse.Price = savedBook.Price;
            bookResponse.Image = savedBook.Image;
            return bookResponse;
        }

    }
}

using BookStore.Application.DTOs;
using BookStore.Application.Interfaces;
using BookStore.Domain.Models;
using BookStore.Domain.Repository;
using static System.Runtime.InteropServices.JavaScript.JSType;
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
                throw new Exception("Book creation failed");
            }
            Book savedBook = await _bookRepository.AddAsync(book);

            BookResponse bookResponse = new BookResponse();
            bookResponse.Id = savedBook.Id;
            bookResponse.Title = savedBook.Title;
            bookResponse.Price = savedBook.Price;
            bookResponse.Image = savedBook.Image;
            return bookResponse;
        }

        public async Task DeleteBookAsync(int id)
        {
            await _bookRepository.DeleteAsync(id);
        }

        public async Task UpdateBookAsync(int bookId, UpdateBookRequest updateBookRequest)
        {
            Book? oldBook = await _bookRepository.FindById(bookId);

            if(oldBook == null)
            {
                throw new Exception("Book is null!");
            }

            (Book ? newBook, string ? Error) = Book.Create(updateBookRequest.Title, updateBookRequest.Description, updateBookRequest.Price, updateBookRequest.Image);
            if (Error != null)
            {
                throw new Exception(Error);
            }
            if (newBook == null)
            {
                throw new Exception("Book creation failed");
            }

            oldBook.Update(newBook);
            await _bookRepository.SaveChangesAsync();
        }

    }
}

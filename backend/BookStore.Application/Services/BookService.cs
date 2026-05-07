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


        public BookDto[] GetBooks()
        {

            Book[] books = _bookRepository.GetBooks().ToArray();
            BookDto[] booksDto = new BookDto[books.Length];

            for (int i = 0; i < books.Length; ++i)
            {
                booksDto[i] = new BookDto();
                booksDto[i].Id = books[i].Id;
                booksDto[i].Title = books[i].Title;
                booksDto[i].Price = books[i].Price;
                booksDto[i].Image = books[i].Image;
            }

            return booksDto;
        }
    }
}

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


        public BookResponseDto[] GetBooks()
        {

            Book[] books = _bookRepository.GetBooks().ToArray();
            BookResponseDto[] booksDto = new BookResponseDto[books.Length];

            for (int i = 0; i < books.Length; ++i)
            {
                booksDto[i] = new BookResponseDto();
                booksDto[i].Id = books[i].Id;
                booksDto[i].Title = books[i].Title;
                booksDto[i].Price = books[i].Price;
                booksDto[i].Image = books[i].Image;
            }

            return booksDto;
        }
    }
}

using BookStore.Application.DTOs;
using BookStore.Application.Interfaces;
using BookStore.Domain.Models;
using BookStore.Domain.Repository;
using System.Security.Authentication.ExtendedProtection;
namespace BookStore.Application.Services
{
    public class BookService : IBookService
    {
        public readonly IBookRepository _bookRepository;

        public BookService(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }
        

        public BookDto[] GetBooks()
        {
            BookDto[] BooksDto;
            Book[] Books = _bookRepository.GetBooks();
            for(int i = 0; i < Books.Length; ++i)
            {
                BooksDto[i].Title = Books[i].Title;
                BooksDto[i].Price = Books[i].Price;
                BooksDto[i].Image = Books[i].Image;
            }

            return BooksDto;
        }
    }
}

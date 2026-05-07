using BookStore.Application.DTOs;
using BookStore.Domain.Models;

namespace BookStore.Application.Interfaces
{
    public interface IBookService
    {
        BookDto[] GetBooks();
    }
}

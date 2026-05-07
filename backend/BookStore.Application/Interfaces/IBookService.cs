using BookStore.Application.DTOs;

namespace BookStore.Application.Interfaces
{
    public interface IBookService
    {
        BookDto[] GetBooks();
    }
}

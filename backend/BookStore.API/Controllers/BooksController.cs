using BookStore.Application.DTOs;
using BookStore.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace BookStore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var books = await _bookService.GetBooksAsync();
            return Ok(books);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateBookRequest createBookRequest)
        {
            var createdBook = await _bookService.CreateBookAsync(createBookRequest);
            return Ok(createdBook);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int bookId)
        {
            await _bookService.DeleteBookAsync(bookId);
            return Ok();
        }
    }
}


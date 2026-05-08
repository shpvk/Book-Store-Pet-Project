using BookStore.Application.DTOs;
using BookStore.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {

        // private readonly IBookRepository _repository; -> Было
        private readonly IBookService _bookService; // -> Стало

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
    }
}


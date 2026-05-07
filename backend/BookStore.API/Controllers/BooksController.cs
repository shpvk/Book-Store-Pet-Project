using BookStore.Domain.Models;
using BookStore.Domain.Repository;
using BookStore.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {

        private readonly IBookRepository _repository;

        public BooksController(IBookRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var books = _repository.GetBooks();
            return Ok(books);
        }


    }
}

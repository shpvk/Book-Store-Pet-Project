using BookStore.Domain.Models;

namespace BookStore.Domain.Repository
{
    public interface IBookRepository
    {
        Book[] BetAllByTitle(string titlePart)
        {
            
        }
    }
}

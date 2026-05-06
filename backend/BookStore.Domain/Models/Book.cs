namespace BookStore.Domain.Models
{
    public class Book
    {
        public Guid Id { get; }

        public string Title { get; } = string.Empty;
        public string Description { get; } = string.Empty;
        public decimal Price { get; }



        public const int MAX_TITLE_LENGTH = 250;
        public const int MAX_DESCRIPTION_LENGTH = 1000;
        private Book(Guid id, string title, string description, decimal price)
        {
            Id = id;
            Title = title;
            Description = description;
            Price = price;
        }

        public static (Book? Book, string? Error) Create(Guid id, string title, string description, decimal price)
        {
            if(string.IsNullOrEmpty(title) && title.Length <= MAX_TITLE_LENGTH)
            {
                return (null, "Title cannot be empty");
            }

            if(string.IsNullOrEmpty(description) && title.Length <= MAX_DESCRIPTION_LENGTH)
            {
                return (null, "Description cannot be empty");
            }
            Book book = new Book(id, title, description, price);
            return (book, null);
        }

        

        
    }
}

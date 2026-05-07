namespace BookStore.Domain.Models
{
    public class Book
    {
        public int Id { get; }

        public string Title { get; } = string.Empty;
        public string Description { get; } = string.Empty;
        public decimal Price { get; }

        public string Image { get; }


        public const int MAX_TITLE_LENGTH = 250;
        public const int MAX_DESCRIPTION_LENGTH = 1000;
        private Book(int id, string title, string description, decimal price, string image)
        {
            Id = id;
            Title = title;
            Description = description;
            Price = price;
            Image = image;
        }

        private Book() { } // For EF Core

        public static (Book? Book, string? Error) Create(int id, string title, string description, decimal price, string image)
        {
            if(string.IsNullOrEmpty(title) || title.Length > MAX_TITLE_LENGTH)
            {
                return (null, "Title cannot be empty");
            }

            if(string.IsNullOrEmpty(description) || description.Length > MAX_DESCRIPTION_LENGTH)
            {
                return (null, "Description cannot be empty");
            }

            if(price < 0)
            {
                return (null, "Price cannot be lower than zero");
            }

            Book book = new Book(id, title, description, price, image);
            return (book, null);
        }

        

        
    }
}

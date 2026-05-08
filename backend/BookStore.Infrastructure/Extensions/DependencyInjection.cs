using BookStore.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


namespace BookStore.Infrastructure.Extensions
{
    public static class DependencyInjection
    {
        public static void AddDatabase(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddDbContext<BookContext>(x =>
            {
                x.UseNpgsql("Host=localhost;Database=Books;Username=postgres;Password=0117"); // temporary
            });
        }
    }
}

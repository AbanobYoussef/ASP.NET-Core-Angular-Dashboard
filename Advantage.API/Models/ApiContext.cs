using Microsoft.EntityFrameworkCore;

namespace Advantage.API.Models {
    public class ApiContext : db {

        public ApiContext (DbContextOptions<ApiContext> options) : base (options) { }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Server> Servers { get; set; }

    }
}

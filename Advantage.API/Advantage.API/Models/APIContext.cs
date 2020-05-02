using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Advantage.API.Models
{
  public class APIContext:DbContext
  {
    public APIContext(DbContextOptions<APIContext> options) : base(options) { }

    public DbSet<Customer> Customers { get; set; }

    public DbSet<Order> Orders { get; set; }

    public DbSet<Servers> Servers { get; set; }

  }
}


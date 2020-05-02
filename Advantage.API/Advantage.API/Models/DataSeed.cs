using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Advantage.API.Models
{
  public class DataSeed
  {
    private readonly APIContext _ctx;

    public DataSeed(APIContext ctx)
    {
      _ctx = ctx;
    }

    private static List<string> states = Helpers.states;

    public void SeedData(int nCustomers, int nOrders)
    {
      if (!_ctx.Customers.Any())
      {
        SeedCustomers(nCustomers);
        _ctx.SaveChanges();
      }

      if (!_ctx.Orders.Any())
      {
        SeedOrders(nOrders);
        _ctx.SaveChanges();
      }

      if (!_ctx.Servers.Any())
      {
        SeedServers();
        _ctx.SaveChanges();
      }
    }

    internal void SeedCustomers(int n)
    {
      var customers = BuildCustomerList(n);

      foreach (var customer in customers)
      {
        _ctx.Customers.Add(customer);
      }
    }

    internal void SeedOrders(int n)
    {
      var orders = BuildOrderList(n);

      foreach (var order in orders)
      {
        _ctx.Orders.Add(order);
      }
    }

    internal void SeedServers()
    {
      var servers = BuildServerList();

      foreach (var server in servers)
      {
        _ctx.Servers.Add(server);
      }
    }

    internal static List<Customer> BuildCustomerList(int n)
    {
      var customers = new List<Customer>();

      for (var i = 1; i <= n; i++)
      {
        var name = Helpers.MakeCustomerName();

        customers.Add(new Customer
        {
          Name = name,
          status = Helpers.GetRandom(states),
          Email = Helpers.MakeEmail(name)
        });
      }

      return customers;
    }

    internal List<Order> BuildOrderList(int n)
    {
      var orders = new List<Order>();

      for (var i = 1; i <= n; i++)
      {
        var placed = Helpers.GetRandOrderPlaced();
        var completed = Helpers.GetRandOrderCompleted(placed);

        orders.Add(new Order
        {
          customer = Helpers.GetRandomCustomer(_ctx),
          Total = Convert.ToInt32(Helpers.GetRandomOrderTotal()),
          placed = placed,
          fulfilled = completed
        });
      }

      return orders;
    }

    internal static List<Servers> BuildServerList()
    {
      return new List<Servers>()
            {
                new Servers
                {
                    Name = "Dev-Web",
                    isOnline = true
                },

                new Servers
                {
                    Name = "Dev-Analysis",
                    isOnline = true
                },

                new Servers
                {
                    Name = "Dev-Mail",
                    isOnline = true
                },

                new Servers
                {
                    Name = "QA-Web",
                    isOnline = true
                },

                new Servers
                {
                    Name = "QA-Analysis",
                    isOnline = true
                },

                new Servers
                {
                    Name = "QA-Mail",
                    isOnline = true
                },

                new Servers
                {
                    Name = "Prod-Web",
                    isOnline = true
                },

                new Servers
                {
                    Name = "Prod-Analysis",
                    isOnline = true
                },

                new Servers
                {
                    Name = "Prod-Mail",
                    isOnline = true
                },
            };
    }
  }
}

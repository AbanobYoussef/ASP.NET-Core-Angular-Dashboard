using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Advantage.API.Models;

namespace Advantage.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly APIContext _context;

        public OrdersController(APIContext context)
        {
            _context = context;
        }

        // GET: api/Orders/pageIndex/pageSize
        [HttpGet("{pageIndex:int}/{pageSize:int}")]
        public IActionResult GetOrders(int pageIndex,int pageSize)
        {
            var data = _context.Orders.Include(o => o.customer)
           .OrderByDescending(c => c.placed);

            var page = new PaginatedResponse<Order>(data, pageIndex, pageSize);

            var totalCount = data.Count();
            var totalPages = Math.Ceiling((double)totalCount/pageSize);

            var response = new
            {
              Page = page,
              TotalPages = totalPages
            };

            return Ok(response);
        }



    [HttpGet("byState")]
    public IActionResult ByState()
    {
      var orders = _context.Orders.Include(o => o.customer).ToList();
      var groupedResult = orders
          .GroupBy(r => r.customer.status)
          .ToList()
          .Select(grp => new
          {
            State = grp.Key,
            Total = grp.Sum(x => x.Total)
          }).OrderByDescending(r => r.Total)
          .ToList();

      return Ok(groupedResult);

    }


    [HttpGet("bycustomer/{n}")]
    public IActionResult ByCustomer(int n)
    {

      var orders = _context.Orders.Include(o => o.customer).ToList();
      var groupedResult = orders
          .GroupBy(r => r.customer.Id)
          .ToList()
          .Select(grp => new
          {
            Name = _context.Customers.Find(grp.Key).Name,
            Total = grp.Sum(x => x.Total)
          }).OrderByDescending(r => r.Total)
          .Take(n)
          .ToList();

      return Ok(groupedResult);
    }

    // GET api/order/5
    [HttpGet("getorder/{id}", Name = "GetOrder")]
    public IActionResult GetOrder(int id)
    {
       var order= _context.Orders.Include(o => o.customer)
          .First(o => o.Id == id);
      return Ok(order);
    }

    // POST api/order
    [HttpPost]
    public IActionResult Post([FromBody] Order order)
    {
      if (order == null)
      {
        return BadRequest();
      }

      _context.Orders.Add(order);
      _context.SaveChanges();

      return CreatedAtRoute("GetOrder", new { id = order.Id }, order);
    }

    // PUT api/order/5
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Order order)
    {
      if (order == null || order.Id != id)
      {
        return BadRequest();
      }

      var updatedOrder = _context.Orders.FirstOrDefault(c => c.Id == id);

      if (updatedOrder == null)
      {
        return NotFound();
      }

      updatedOrder.customer = order.customer;
      updatedOrder.fulfilled = order.fulfilled;
      updatedOrder.Total = order.Total;
      updatedOrder.placed = order.placed;

      _context.SaveChanges();
      return new NoContentResult();
    }

    // DELETE api/order/5
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      var order = _context.Orders.FirstOrDefault(t => t.Id == id);
      if (order == null)
      {
        return NotFound();
      }

      _context.Orders.Remove(order);
      _context.SaveChanges();
      return new NoContentResult();
    }
  }
}

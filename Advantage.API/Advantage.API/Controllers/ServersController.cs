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
    public class ServersController : ControllerBase
    {
        private readonly APIContext _context;

        public ServersController(APIContext context)
        {
            _context = context;
        }

    // GET api/servers
    [HttpGet]
    public IActionResult Get()
    {
      var response = _context.Servers.OrderBy(s => s.Id).ToList();
      return Ok(response);
    }

    // GET api/servers/5
    [HttpGet("{id}", Name = "GetServer")]
    public Servers Get(int id)
    {
      return _context.Servers.Find(id);
    }

    // POST api/servers
    [HttpPost]
    public IActionResult Post([FromBody] Servers server)
    {
      if (server == null)
      {
        return BadRequest();
      }

      _context.Servers.Add(server);
      _context.SaveChanges();

      return CreatedAtRoute("GetServer", new { id = server.Id }, server);
    }

    [HttpPut("{id}")]
    public IActionResult Message(int id, [FromBody] ServerMessage msg)
    {

      var server = _context.Servers.FirstOrDefault(s => s.Id == id);

      if (server == null)
      {
        return NotFound();
      }

      // move update handling to a service, perhaps
      if (msg.Payload == "activate")
      {
        server.isOnline = true;
        _context.SaveChanges();
      }

      if (msg.Payload == "deactivate")
      {
        server.isOnline = false;
        _context.SaveChanges();
      }

      return new NoContentResult();
    }

    // DELETE api/server/5
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      var server = _context.Servers.FirstOrDefault(t => t.Id == id);
      if (server == null)
      {
        return NotFound();
      }

      _context.Servers.Remove(server);
      _context.SaveChanges();
      return new NoContentResult();
    }
  }
}

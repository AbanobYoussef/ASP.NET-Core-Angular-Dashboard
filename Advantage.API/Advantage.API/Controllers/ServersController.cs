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

        // GET: api/Servers
        [HttpGet]
        public IEnumerable<Servers> GetServers()
        {
            return _context.Servers;
        }

        // GET: api/Servers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetServers([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var servers = await _context.Servers.FindAsync(id);

            if (servers == null)
            {
                return NotFound();
            }

            return Ok(servers);
        }

        // PUT: api/Servers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServers([FromRoute] int id, [FromBody] Servers servers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != servers.Id)
            {
                return BadRequest();
            }

            _context.Entry(servers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Servers
        [HttpPost]
        public async Task<IActionResult> PostServers([FromBody] Servers servers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Servers.Add(servers);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServers", new { id = servers.Id }, servers);
        }

        // DELETE: api/Servers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServers([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var servers = await _context.Servers.FindAsync(id);
            if (servers == null)
            {
                return NotFound();
            }

            _context.Servers.Remove(servers);
            await _context.SaveChangesAsync();

            return Ok(servers);
        }

        private bool ServersExists(int id)
        {
            return _context.Servers.Any(e => e.Id == id);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Advantage.API.Models
{
  public class ServerMessage
  {
    public int Id { get; set; }
    public string Payload { get; set; }
    // DateTime Sent { get; set; }
  }
}

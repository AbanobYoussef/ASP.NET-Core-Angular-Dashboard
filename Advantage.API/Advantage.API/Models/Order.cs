using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Advantage.API.Models
{
  public class Order
  {

    public int Id { get; set; }
    public Customer customer { get; set; }
    public int Total { get; set; }
    public DateTime placed { get; set; }
    public DateTime? fulfilled { get; set; }

    public string status { get; set; }


  }
}

 System.DateTime oldDate;
 System.DateTime currentDate;

 namespace Advantage.API.Models
{
    public class Order
    {
        public int Id {get; set;}
        public Customer Customer {get; set;}
        public decimal OrderEmail {get; set;}
        public DateTime  Placed {get; set;}
        public DateTime?  Completed {get; set;}
    }
}

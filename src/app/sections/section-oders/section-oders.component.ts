import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/order';
import { SalesDataService } from 'src/app/services/sales-data.service';

@Component({
  selector: 'app-section-oders',
  templateUrl: './section-oders.component.html',
  styleUrls: ['./section-oders.component.css']
})
export class SectionOdersComponent implements OnInit {


  public orders: Order[];
  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  // tslint:disable-next-line:variable-name
  constructor(private serv: SalesDataService) { }


  ngOnInit(): void {
    this.getOrders();
  }


  getOrders(){
    this.serv.getOrders(this.page, this.limit).subscribe( res => {
      // tslint:disable-next-line:no-string-literal
      this.orders = res['page']['data'] as Order[];
      // tslint:disable-next-line:no-string-literal
      this.total = res['page'].total;
      this.loading = false;
     });
  }

  goToPrevious(): void {
    // console.log('Previous Button Clicked!');
    this.page--;
    this.getOrders();
  }

  goToNext(): void {
    // console.log('Next Button Clicked!');
    this.page++;
    this.getOrders();
  }

  goToPage(n: number): void {
    this.page = n;
    this.getOrders();
  }

}

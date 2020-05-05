import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';

@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: ['./section-sales.component.css']
})
export class SectionSalesComponent implements OnInit {

  salesDataByCustomer: any;
  salesDataByState: any;

  constructor(private serv: SalesDataService) { }

  ngOnInit() {
    this.serv.getOrdersByState().subscribe(res => {
      this.salesDataByState = res;
    });

    this.serv.getOrdersByCustomer(5).subscribe(res => {
      this.salesDataByCustomer = res;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';
import * as moment from 'moment';



 // const SAMPLE_BARCHART_DATA: any[] = [
 //   { data: [65, 59, 80, 81, 56, 54, 30], label: 'Q3 Sales'},
 //    { data: [25, 39, 60, 91, 36, 54, 50], label: 'Q4 Sales'}
 //  ];

 // const SAMPLE_BARCHART_LABELS: string[] = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private serv: SalesDataService) { }

  orders: any;
  orderLable: string[];
  orderDate: number[];


  public barChartDate: any[] ;
  public  barChartLabels: string[] ;
  public  barChartLegend = true;
  public  barChartType = 'bar';
  // tslint:disable-next-line:typedef-whitespace
  public  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  ngOnInit(): void {

    this.serv.getOrders(1, 100).subscribe(res => {
      // console.log(res);
      const localChartData = this.getChartData(res);
      this.barChartLabels = localChartData.map(x => x[0]).reverse();
      this.barChartDate = [ { data: localChartData.map(x => x[1]), label: 'Sales'} ];

      // console.log( this.barChartDate);

    });
  }


  getChartData(res: any)
  {
    // tslint:disable-next-line:no-string-literal
    this.orders = res['page']['data'];
    // console.log(this.orders);
    const FormatedOrders = this.orders.map(o => [ moment(new Date( o.placed)).format('YY-MM-DD') ,  o.total ]);

    const p = [];

    const charData = FormatedOrders.reduce((r , e ) => {
      const key = e[0];
      if (!p[key]) {
        p[key] = e;
        r.push(p[key]);
      } else {
        p[key][1] += e[1];
      }
      return r;
     } , []);

    return charData;

    // const myData = [3 , 4 , 5].reduce((sum , value) => {
    // console.log('sum: ' + sum , 'value: ' + value);
    // return sum + value;
    // }, 0 );
    // console.log('myData: ', myData);


  }

}

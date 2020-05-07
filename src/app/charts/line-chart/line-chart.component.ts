import { Component, OnInit } from '@angular/core';

import { LINE_CHART_COLORS } from '../../shared/chart.color';
import { SalesDataService } from 'src/app/services/sales-data.service';

import * as moment from 'moment';
/*const LINE_CHART_SAMPLE_DATA: any[] = [
   { data: [32, 14, 46, 23, 38, 56], label: 'Sentiment Analysis'},
   { data: [12, 18, 26, 13, 28, 26], label: 'Image Recognition'},
   { data: [52, 34, 49, 53, 68, 62], label: 'Forecasting'},
 ];*/
// const LINE_CHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];



@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor(private serv: SalesDataService) { }


  topCustomers: string[];
  allOrders: any[];
  allOrdersByCustomers: any;

  lineChartData: any;
  lineChartLabels: any;
  lineChartOptions: any = {
    responsive: true
  };


  lineChartLegend: true;
  lineChartType = 'line';
  lineChartColors = LINE_CHART_COLORS;

  ngOnInit(): void {

    this.serv.getOrders(1 , 100 ).subscribe(res => {
    // tslint:disable-next-line:no-string-literal
    this.allOrders = res['page']['data'];

    this.serv.getOrdersByCustomer(3).subscribe( cus => {
      this.allOrdersByCustomers = cus;
      // tslint:disable-next-line:no-string-literal
      this.topCustomers =  this.allOrdersByCustomers.map(x => x['name']);


      const allChartData = this.topCustomers.reduce((result , i) => {
        result.push(this.getChartData(this.allOrders , i));
        return result;
      } , []);

      // tslint:disable-next-line:no-string-literal
      let dates = allChartData.map(x => x['data']).reduce((a, i) => {
        a.push(i.map(o => new Date(o[0])));
        return a;
      }, []);


        // console.log('dates:', dates);
      dates = [].concat.apply([], dates); // conact all the 3 arraies of data in one array
        // console.log('dates:', dates);

      // tslint:disable-next-line:no-string-literal
      const r = this.getCustomerOrdersByDate(allChartData, dates)['data'];
     // console.log('r:', r);

      // tslint:disable-next-line:no-string-literal
      this.lineChartLabels = r[0]['orders'].map(o => o['date']);

      this.lineChartData = [
          // tslint:disable-next-line:no-string-literal
          { data: r[0].orders.map(x => x.total), label: r[0]['customer']},
          // tslint:disable-next-line:no-string-literal
          { data: r[1].orders.map(x => x.total), label: r[1]['customer']},
          // tslint:disable-next-line:no-string-literal
          { data: r[2].orders.map(x => x.total), label: r[2]['customer']}
        ];
     }); // seconde subscribe
    }); // first subscribe

  }

  getChartData(allOrders: any, name: string) {
    const customerOrders = allOrders.filter(o => o.customer.name === name);
    // console.log('name:', name, 'customerOrders:', customerOrders);

    const formattedOrders = customerOrders.reduce((r, e) => {
      r.push([e.placed, e.total]);
      return r;
    }, []);

    // console.log('formattedOrders:', formattedOrders);
    const result = { customer: name, data: formattedOrders };

    // console.log('result:', result);
    return result;
  }


  getCustomerOrdersByDate(orders: any, dates: any) {
    // for each customer -> for each date =>
    // { data: [{'customer': 'XYZ', 'orders': [{ 'date': '17-11-25', total: 2421}, {}]}, {}, {}]}
    const customers = this.topCustomers;
    const prettyDates = dates.map(x => this.toFriendlyDate(x));
    const u = Array.from(new Set(prettyDates)).sort();
    // console.log(u);

    // define our result object to return:
    const result = {};
    // tslint:disable-next-line:no-string-literal
    const dataSets = result['data'] = [];

    customers.reduce((x, y, i) => {
      // console.log('Reducing:', y, 'at index:', i);
      const customerOrders = [];
      dataSets[i] = {
        customer: y, orders: u.reduce((r, e, j) => {
          const obj = {};
          // tslint:disable-next-line:no-string-literal
          obj['date'] = e;
          // tslint:disable-next-line:no-string-literal
          obj['total'] = this.getCustomerDateTotal(e, y); // sum total orders for this customer on this day
          customerOrders.push(obj);
          // console.log('Reducing:', e, 'at index:', j, 'customerOrders', customerOrders);
          return customerOrders;
        })
      };
      return x;
    }, []);

    return result;
  }

  toFriendlyDate(date: Date) {
    return moment(date).endOf('day').format('YY-MM-DD');
  }

  getCustomerDateTotal(date: any, customer: string) {
    const r = this.allOrders.filter(o => o.customer.name === customer
      && this.toFriendlyDate(o.placed) === date);

    const result = r.reduce((a, b) => {
      return a + b.total;
    }, 0);

    return result;
  }

}

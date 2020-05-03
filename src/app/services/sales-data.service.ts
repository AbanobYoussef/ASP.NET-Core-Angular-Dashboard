import { Injectable } from '@angular/core';
import { HttpClient, ɵangular_packages_common_http_http_a } from '@angular/common/http';
import { Order } from '../shared/order';

@Injectable({
  providedIn: 'root'
})
export class SalesDataService {
  orders: Order[];
  // tslint:disable-next-line:variable-name
  constructor(private http: HttpClient) { }

 getOrders(pageIndex: number, pageSize: number)
 {
  return this.http.get('https://localhost:44384/api/Orders/' + pageIndex + '/' + pageSize);
 }

 getOrdersByCustomer(n: number) {
  return this.http.get('https://localhost:44384/api/Orders/bycustomer/' + n);
}

getOrdersByState() {
  return this.http.get('https://localhost:44384/api/Orders/byState');
}


}

import { Data } from '@angular/router';
// tslint:disable-next-line:import-spacing
import {Customer} from  './customer';

export interface Order{
    orders: any;
    id: number;
    customer: Customer;
    total: number;
    placed: Data;
    fulfilled: Data;
    status: string;
}

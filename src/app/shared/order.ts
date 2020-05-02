import { Data } from '@angular/router';
// tslint:disable-next-line:import-spacing
import {Customer} from  './customer';

export interface Order{
    id: number;
    customer: Customer;
    total: number;
    placed: Data;
    fulfilled: Data;
    status: string;
}

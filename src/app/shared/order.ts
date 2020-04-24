import { Data } from '@angular/router';
import {Customer} from  './customer';

export interface Order{
    id:number;
    customer:Customer;
    total:number;
    placed:Data;
    fulfilled:Data;
    status:string;
}
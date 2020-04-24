import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/order';

@Component({
  selector: 'app-section-oders',
  templateUrl: './section-oders.component.html',
  styleUrls: ['./section-oders.component.css']
})
export class SectionOdersComponent implements OnInit {

  constructor() { }
  
  orders:Order[]=[
    {
      id:1 ,
      customer:
        {
          id:1,
          name:"Main St Bakery",
          status:'CO',
          email:'mainst@example.com'
        },
        total:230,
        placed:new Date(2017,12,1),
        fulfilled:new Date(2017,12,1),
      status:"completed"},
      {
        id:2 ,
        customer:
          {
            id:1,
            name:"Main St Bakery",
            status:'CO',
            email:'mainst@example.com'
          },
          total:230,
          placed:new Date(2017,12,1),
          fulfilled:new Date(2017,12,1),
        status:"completed"},
        {
          id:3 ,
          customer:
            {
              id:1,
              name:"Main St Bakery",
              status:'CO',
              email:'mainst@example.com'
            },
            total:230,
            placed:new Date(2017,12,1),
            fulfilled:new Date(2017,12,1),
          status:"completed"},
          {
            id:4 ,
            customer:
              {
                id:1,
                name:"Main St Bakery",
                status:'CO',
                email:'mainst@example.com'
              },
              total:230,
              placed:new Date(2017,12,1),
              fulfilled:new Date(2017,12,1),
            status:"completed"},
            {
              id:5 ,
              customer:
                {
                  id:1,
                  name:"Main St Bakery",
                  status:'CO',
                  email:'mainst@example.com'
                },
                total:230,
                placed:new Date(2017,12,1),
                fulfilled:new Date(2017,12,1),
              status:"completed"}
      
  ];
  ngOnInit(): void {
  }

}

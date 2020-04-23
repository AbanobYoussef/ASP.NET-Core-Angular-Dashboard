import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }
  public pieChartDate:number[]=[350,450,120];
  public colors:any[]=[
    {
      backgroundColor:['#26547c','#ff6b6b','#ffd166'],
      borderColor:'#111'
    }
  ];
  public pieChartLabels:string[]=['XYZ logistics','Main St Bakery','Acme Hosting'];
  public pieChartType='doughnut';
  ngOnInit(): void {
  }

}

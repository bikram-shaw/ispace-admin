import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label,SingleDataSet,monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  // units
  public unitlineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 50] ,lineTension:0.9,borderWidth:1 },
  ];
  public unitlineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public unitlineChartOptions: any = {
    scaleShowVerticalLines: false,
    animation: false,
    scaledisplay:false,
    responsive: true,

    tooltips: {
      mode: 'nearest',
      yAlign: 'center',
      xAlign: 'top',
      titleFontSize: 12,
      bodyFontSize: 12

    },



scales: {
  xAxes: [
   {
       display: false
   }
 ],
  yAxes: [
     {
       display: false
   }
]
}
  };
  public unitlineChartColors: Color[] = [
    {
      borderColor: ' rgba(164,72,187,60%)',
      backgroundColor: 'rgba(204,0,255,18%)',
    },
  ];
  public unitlineChartLegend = false;
  public unitlineChartType = 'line';
  public unitlineChartPlugins = [];
//  bidders
  public bidderslineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40] ,lineTension:0.9,borderWidth:1},
  ];
  public bidderslineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public bidderslineChartOptions: any = {
    scaleShowVerticalLines: false,
    animation: false,
    scaledisplay:false,
    responsive: true,
    tooltips: {
      mode: 'nearest',
      yAlign: 'center',
      xAlign: 'top',
      titleFontSize: 12,
      bodyFontSize: 12

    },



scales: {
  xAxes: [
   {
       display: false
   }
 ],
  yAxes: [
     {
       display: false
   }
]
}
  };
  public bidderslineChartColors: Color[] = [
    {
      borderColor: ' rgba(0, 133,255,60%)',
      backgroundColor: 'rgba(0, 133,255,18%)',
    },
  ];
  public bidderslineChartLegend = false;
  public bidderslineChartType = 'line';
  public bidderslineChartPlugins = [];
 //booked
 public bookedlineChartData: ChartDataSets[] = [
  { data: [65, 59, 80, 81, 56, 55, 40],lineTension:0.9,borderWidth:1 },
];
public bookedlineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
public bookedlineChartOptions: any = {
  scaleShowVerticalLines: false,
  animation: false,
  scaledisplay:false,
  responsive: true,
  tooltips: {
    mode: 'nearest',
    yAlign: 'center',
    xAlign: 'top',
    titleFontSize: 10,
    bodyFontSize: 11

  },



scales: {
xAxes: [
 {
     display: false
 }
],
yAxes: [
   {
     display: false
 }
]
}
};
public bookedlineChartColors: Color[] = [
  {
    borderColor: ' rgba(255, 0, 77,60%)',
    backgroundColor: 'rgba(255,0,77,18%)',
  },
];
public bookedlineChartLegend = false;
public bookedlineChartType = 'line';
public bookedlineChartPlugins = [];
// vistors
public vistorslineChartData: ChartDataSets[] = [
  { data: [65, 59, 80, 81, 56, 55, 40],lineTension:0.9,borderWidth:1 },
];
public vistorslineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
public vistorslineChartOptions: any = {
  scaleShowVerticalLines: false,
  animation: false,
  scaledisplay:false,
  responsive: true,
  tooltips: {
    mode: 'nearest',
    yAlign: 'center',
    xAlign: 'top',
    titleFontSize: 10,
    bodyFontSize: 11

  },



scales: {
xAxes: [
 {
     display: false
 }
],
yAxes: [
   {
     display: false
 }
]
}
};
public vistorslineChartColors: Color[] = [
  {
    borderColor: ' rgba(0,255,178,60%)',
    backgroundColor: 'rgba(0,255,178,18%)',
  },
];
public vistorslineChartLegend = false;
public vistorslineChartType = 'line';
public vistorslineChartPlugins = [];


   // Pie Chart
   public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {position: 'bottom',
    labels:
    {
      usePointStyle:true,
      padding:30
    },

  },

  };
  public pieChartLabels: Label[] = ['Biddings', 'Bookings', 'Visitings'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType= 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  // Bar chart
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {position: 'bottom',
    labels:
    {
      boxWidth:20,
      padding:30
    },
  },
  scales: {
    yAxes: [
       {
         display: false
     }
  ]
  }
  };
  public barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Active Bidder' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Visiter' }
  ];
  public barChartColors: Color[] = [
    { backgroundColor: '#6B46BF' },
    { backgroundColor: '#87E8AB' },
  ]

 //bid history
 bookHistory=
 [
   {
     project_name:"Project-1",
     unit_name:"Unit-1",
     user_mobile:"9876543210",
     date:"30-1-2021"
   },
   {
    project_name:"Project-1",
    unit_name:"Unit-2",
    user_mobile:"9876543210",
    date:"30-1-2021"
  },
  {
    project_name:"Project-2",
    unit_name:"Unit-3",
    user_mobile:"9876543210",
    date:"30-1-2021"
  },
  {
    project_name:"Project-1",
    unit_name:"Unit-4",
    user_mobile:"9876543210",
    date:"30-1-2021"
  },
  {
    project_name:"Project-2",
    unit_name:"Unit-5",
    user_mobile:"9876543210",
    date:"30-1-2021"
  },
  {
    project_name:"Project-3",
    unit_name:"Unit-1",
    user_mobile:"9876543210",
    date:"30-1-2021"
  },
  {
    project_name:"Project-4",
    unit_name:"Unit-2",
    user_mobile:"9876543210",
    date:"30-1-2021"
  },
  {
    project_name:"Project-3",
    unit_name:"Unit-4",
    user_mobile:"9876543210",
    date:"30-1-2021"
  },
 ]

  ngOnInit(): void {
    console.log(screen.width)
  }

}

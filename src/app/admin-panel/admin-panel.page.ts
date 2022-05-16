import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexAnnotations, ApexDataLabels, ApexAxisChartSeries, ApexNonAxisChartSeries, ApexStroke, ApexLegend, ApexFill, ApexTooltip, ApexPlotOptions, ApexResponsive, ApexXAxis, ApexYAxis, ApexGrid, ApexStates, ApexTitleSubtitle, ApexTheme } from 'ng-apexcharts';
import { map } from 'rxjs/operators';
import { OrdersService} from '../orders.service';

export type ChartOptions = {
  chart: ApexChart;
  annotations: ApexAnnotations;
  colors: string[];
  dataLabels: ApexDataLabels;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  stroke: ApexStroke;
  labels: string[];
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  grid: ApexGrid;
  states: ApexStates;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  theme: ApexTheme;
}


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})

export class AdminPanelPage implements OnInit {

  dataStore;

  public options1: Partial<ChartOptions>;
  public options2: Partial<ChartOptions>;
  public options3: Partial<ChartOptions>;
  public options4: Partial<ChartOptions>;

  public totalOrders: number;
  public totalAmount: number;

  // each index represent a day, iterate through order and add 1 to the value of the corresponding index
  // The array must be defined with 0 values and the length must be based on number of days in current month
  public dayOfCurrentMonth: number;
  public ordersInMonth: number[];

  // each index represent a month, iterate through order and add 1 to the value of the corresponding index
  public ordersInYear: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //heatmap
  public ordersByTimeAndDay: [{
    name: '12AM',
    data: [0, 0, 0, 0, 0, 0, 0]
  },
    {
      name: '1AM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '2AM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '3AM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '4AM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '5AM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '6AM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '7AM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '8AM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '9AM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '10AM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '11AM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '12PM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '1PM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '2PM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '3PM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '4PM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '5PM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '6PM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '7PM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '8PM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '9PM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '10PM',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: '11PM',
      data: [0, 0, 0, 0, 0, 0, 0]
    }
  ];

  constructor(public orderServ: OrdersService) {
    this.spackLine()
  }

  spackLine() {

    this.options4 = {
      series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Amount of revenue this year',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
    };

    this.options3 = {
      series: [{
        name: '12AM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '1AM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '2AM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '3AM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '4AM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '5AM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '6AM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '7AM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '8AM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '9AM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '10AM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '11AM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '12PM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '1PM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '2PM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '3PM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '4PM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '5PM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '6PM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '7PM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '8PM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '9PM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '10PM',
        data: [23, 34, 10, 60, 50, 30, 50]
      },
      {
        name: '11PM',
        data: [23, 34, 10, 60, 50, 30, 50]
      }
      ],
      chart: {
        height: 700,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#008FFB"],
      title: {
        text: 'HeatMap Chart (Single color)'
      },
      xaxis: {
        categories: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fi', 'Sa'],
      }
    };

    this.options2 = {
      series: [44, 55, 41, 17, 15],
      chart: {
        type: 'donut',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 410
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      title: {
        text: "Categories analysis"
      },


    };

    this.options1 = {
      series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Number of orders this year',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
    };

  };

  ngOnInit() {

     this.orderServ.getOrders().subscribe((orders)=> {
       this.dataStore = orders
       console.log(this.dataStore)
      //  do your calculation here
      })

    const d = new Date();
    var month = d.getMonth() + 1;	// Month	[mm]	(1 - 12)
    var day = d.getDate();		// Day		[dd]	(1 - 31)
    var year = d.getFullYear();	// Year		[yyyy]

    switch (month) {
      case 1:
        this.dayOfCurrentMonth = 31;
        break;
      case 2:
        this.dayOfCurrentMonth = 28;
        break;
      case 3:
        this.dayOfCurrentMonth = 31;
        break;
      case 4:
        this.dayOfCurrentMonth = 30;
        break;
      case 5:
        this.dayOfCurrentMonth = 31;
        break;
      case 6:
        this.dayOfCurrentMonth = 30;
        break;
      case 7:
        this.dayOfCurrentMonth = 31;
        break;
      case 8:
        this.dayOfCurrentMonth = 31;
        break;
      case 9:
        this.dayOfCurrentMonth = 30;
        break;
      case 10:
        this.dayOfCurrentMonth = 31;
        break;
      case 11:
        this.dayOfCurrentMonth = 30;
        break;
      case 12:
        this.dayOfCurrentMonth = 31;
        break;

    }

  }

}

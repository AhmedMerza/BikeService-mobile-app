import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexAnnotations, ApexDataLabels, ApexAxisChartSeries, ApexNonAxisChartSeries, ApexStroke, ApexLegend, ApexFill, ApexTooltip, ApexPlotOptions, ApexResponsive, ApexXAxis, ApexYAxis, ApexGrid, ApexStates, ApexTitleSubtitle, ApexTheme } from 'ng-apexcharts';
import { map } from 'rxjs/operators';
import { OrdersService } from '../orders.service';
import { ChartsDataTemplateService } from '../charts-data-template.service';

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
  public showStatsFor: 'thisMonth';



  public thisYearOrders = this.dataTemp.aYearOrders;
  public thisYearReveue = this.dataTemp.aYearRevenue;

  public numOfOrders: Partial<ChartOptions>;
  public donutChart: Partial<ChartOptions>;
  public heatmapChart: Partial<ChartOptions>;
  public revenueChart: Partial<ChartOptions>;

  public totalOrders: number;
  public totalAmount: number;

  public labels= [];

  public dataForOrdersChart: number[];
  public dataForRevenueChart: number[];
  public dataForHeatMap = this.dataTemp.heatMapDataTemp;

  public periods = [{'name': 'This Month', 'value': 'thisMonth'}, {'name': 'This Year', 'value': 'thisYear'}];



  public dayOfCurrentMonth: number;

  // each index represent a day, iterate through orders and add 1 to the value of the corresponding index
  // The array must be defined with 0 values and the length must be based on number of days in current month
  public ordersInMonth: number[];

  // each index represent a month, iterate through orders and add 1 to the value of the corresponding index
  public ordersInYear: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  changePeriod(){
    let period = this.showStatsFor;
    let d = new Date();
    let m = d.getMonth() + 1;
    let labels = [];
    this.numOfOrders.xaxis.categories = [];
    this.revenueChart.xaxis.categories = [];
    if(period == 'thisMonth'){
      
      if(m == 2){
        for(let i = 1; i < 30; i++){
          labels.push(String(i))
        }
      }
      else if(m == 4 || m == 6 || m == 9 || m == 11){
        for(let i = 1; i < 31; i++){
          labels.push(String(i))
        }
      }
      else{
        for(let i = 1; i < 32; i++){
          labels.push(String(i))
        }
      }
      console.log(labels,m);
      this.labels = labels;
      this.dataForOrdersChart = this.calOrdersForMonth(m);
      this.dataForRevenueChart = this.calRevenueForMonth(m);
      this.heatMapData = this.calHeatmapForMonth(m);
    }
    else if(period=='thisYear'){

      this.dataForOrdersChart = this.calOrdersForYear();
      this.dataForRevenueChart = this.calRevenueForYear();
      this.dataForHeatMap = this.calHeatmapForYear();

    }
    this.spackLine();
  }

  calOrdersByMonth(m: number){
    let sum = 0;
    let d = new Date();
    let year = d.getFullYear();
    if(m == 2){
      for(let i = 1; i < 30; i++){
        sum += this.calOrdersByDayOfMonth(i, m);
      }
    }
    else if(m == 4 || 6 || 9 || 11){
      for(let i = 1; i < 31; i++){
        sum += this.calOrdersByDayOfMonth(i, m);
      }
    }
    else{
      for(let i = 1; i < 32; i++){
        sum += this.calOrdersByDayOfMonth(i, m);
      }
    }
    return sum;
  }

  calOrdersForMonth(m: number){
    let orders= [];
    let d = new Date();
    let year = d.getFullYear();
    if(m == 2){
      for(let i = 1; i < 30; i++){
        orders.push(this.calOrdersByDayOfMonth(i, m));
      }
    }
    else if(m == 4 || 6 || 9 || 11){
      for(let i = 1; i < 31; i++){
        orders.push(this.calOrdersByDayOfMonth(i, m));
      }
    }
    else{
      for(let i = 1; i < 32; i++){
        orders.push(this.calOrdersByDayOfMonth(i, m));
      }
    }
    return orders;
  }

  calOrdersForYear(){
    let revenue= [];
      for(let i = 1; i < 13; i++){
        revenue.push(this.calOrdersByMonth(i));
      }
    return revenue;
  }

  calOrdersByDayOfMonth(d: number, m: number) {
    let sum = 0;
    for(let i = 0; i < 24; i++){
      sum += this.thisYearOrders[m][d][i];
    }
    return sum;
  }

  calRevenueByMonth(m: number){
    let sum = 0;
    let d = new Date();
    let year = d.getFullYear();
    if(m == 2){
      for(let i = 1; i < 30; i++){
        sum += this.calRevenueByDayOfMonth(i, m);
      }
    }
    else if(m == 4 || 6 || 9 || 11){
      for(let i = 1; i < 31; i++){
        sum += this.calRevenueByDayOfMonth(i, m);
      }
    }
    else{
      for(let i = 1; i < 32; i++){
        sum += this.calRevenueByDayOfMonth(i, m);
      }
    }
    return sum;
  }

  calRevenueForMonth(m: number){
    let revenue= [];
    let d = new Date();
    let year = d.getFullYear();
    if(m == 2){
      for(let i = 1; i < 30; i++){
        revenue.push(this.calRevenueByDayOfMonth(i, m));
      }
    }
    else if(m == 4 || m == 6 || m == 9 || m == 11){
      for(let i = 1; i < 31; i++){
        revenue.push(this.calRevenueByDayOfMonth(i, m));
      }
    }
    else{
      for(let i = 1; i < 32; i++){
        revenue.push(this.calRevenueByDayOfMonth(i, m));
      }
    }
    return revenue;
  }

  calRevenueForYear(){
    let revenue= [];
      for(let i = 1; i < 13; i++){
        revenue.push(this.calRevenueByMonth(i));
      }
   
    return revenue;
  }

  calRevenueByDayOfMonth(d: number, m: number) {
    let sum = 0;
    for(let i = 0; i < 24; i++){
      sum += this.thisYearReveue[m][d][i];
    }
    return sum;
  }

  calHeatmapForMonth(m){
    return this.dataTemp.heatMapDataTemp;
  }

  calHeatmapForYear(){
    return this.dataTemp.heatMapDataTemp;
  }

  //heatmap
  public heatMapData = this.dataTemp.heatMapDataTemp;

  constructor(public orderServ: OrdersService, public dataTemp: ChartsDataTemplateService) {
    this.spackLine();
  }

  spackLine() {

    this.revenueChart = {
      series: [{
        name: "Desktops",
        data: this.dataForRevenueChart,
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
        categories: this.labels,
      }
    };

    //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    
    this.heatmapChart = {
      series: this.heatMapData,
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

    /*this.options2 = {
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
    */

    this.numOfOrders = {
      series: [{
        name: "Desktops",
        data: this.dataForOrdersChart,
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
        categories: this.labels,
      }
    };

  };

  ngOnInit() {


    const d = new Date();
    var m = d.getMonth() + 1;	// Month	[mm]	(1 - 12)
    var day1 = d.getDate();		// Day		[dd]	(1 - 31)
    var year1 = d.getFullYear();	// Year		[yyyy]



    this.orderServ.getOrders().subscribe((orders) => {
      this.dataStore = orders
      console.log(this.dataStore)
      for (let order of this.dataStore) {
        let hour = order.Date.toDate().getHours();
        let day = order.Date.toDate().getDate();
        let month = order.Date.toDate().getMonth() + 1;
        let year = order.Date.toDate().getFullYear();
        
        this.thisYearOrders[month][day][hour] +=1;
        this.thisYearReveue[month][day][hour] += order.totalPrice;

        let dayWeekName = order.Date.toDate().getDay();



        this.heatMapData[hour].data[dayWeekName] += 1;
        
        
      }
      this.dataForOrdersChart=[
      this.calOrdersByMonth(1),
      this.calOrdersByMonth(2),
      this.calOrdersByMonth(3),
      this.calOrdersByMonth(4), 
      this.calOrdersByMonth(5),
      this.calOrdersByMonth(6), 
      this.calOrdersByMonth(7),
      this.calOrdersByMonth(8), 
      this.calOrdersByMonth(9),
      this.calOrdersByMonth(10),
      this.calOrdersByMonth(11),
      this.calOrdersByMonth(12),
      ];

      this.dataForRevenueChart = [
        this.calRevenueByMonth(1),
        this.calRevenueByMonth(2),
        this.calRevenueByMonth(3),
        this.calRevenueByMonth(4),
        this.calRevenueByMonth(5),
        this.calRevenueByMonth(6),
        this.calRevenueByMonth(7),
        this.calRevenueByMonth(8),
        this.calRevenueByMonth(9),
        this.calRevenueByMonth(10),
        this.calRevenueByMonth(11),
        this.calRevenueByMonth(12),

      ];

      console.log(this.heatMapData[23]);

      if(m == 2){
        for(let i = 1; i < 30; i++){
          this.labels.push(String(i))
        }
      }
      else if(m == 4 || m == 6 || m == 9 || m == 11){
        for(let i = 1; i < 31; i++){
          this.labels.push(String(i))
        }
      }
      else{
        for(let i = 1; i < 32; i++){
          this.labels.push(String(i))
        }
      }

      this.dataForOrdersChart = this.calOrdersForMonth(m);
      this.dataForRevenueChart = this.calRevenueForMonth(m);
      this.heatMapData = this.calHeatmapForMonth(m);

      

      this.spackLine();

    })
    


  }

}

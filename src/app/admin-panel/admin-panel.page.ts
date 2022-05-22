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

  constructor(public orderServ: OrdersService, public dataServ: ChartsDataTemplateService) {
    this.spackLine();
  }


  dataStore;
  public showStatsFor= 'thisMonth';
  public periods = [{'name': 'This Month', 'value': 'thisMonth'}, {'name': 'This Year', 'value': 'thisYear'}];
  public selectedPeriodName = "this month";
  public period: string = this.dataServ.formatPeriod(this.showStatsFor);

  public numOfOrders: Partial<ChartOptions>;
  public donutChart: Partial<ChartOptions>;
  public heatmapChart: Partial<ChartOptions>;
  public revenueChart: Partial<ChartOptions>;


  
  public dataForOrdersChart;
  public dataForRevenueChart;
  public heatMapData;
  public labels;

  

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
        text: 'Amount of revenue',
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
      },
      
          
    
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
        text: 'Orders by hour and day of week'
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
        text: 'Number of orders',
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

  async x(){
        this.dataServ.getData()
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.dataForOrdersChart = this.dataServ.NumberOfOrdersData(this.period);
        this.dataForRevenueChart = this.dataServ.AmountOfRevenueData(this.period);
        this.heatMapData = this.dataServ.getHeatmapData(this.period);
        this.labels = this.dataServ.getLabels(this.period);
  }

  

  ngOnInit() {
        this.x();
      
      this.spackLine();
  }

}

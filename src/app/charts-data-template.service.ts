import { Injectable } from '@angular/core';
import { OrdersService } from './orders.service';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class ChartsDataTemplateService {

  constructor(public orderServ: OrdersService, public serviceServ: ServiceService) { }
  public dataStore;
  public serviceStore;
  public data = {};
  public years: Set<number> = new Set();
  public servicesVsItems: number[] = [0, 0];
  public numOfOrders: number[];
  public revenue: number[];

  public heatmapDataTemp = [{
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

  public heatmapData = Array.from(this.heatmapDataTemp);

  //First lets put a functions that takes the inputs [period("this month" or "this year"), type("orders" or "revenue")]
  // Calculates totalOrders, totalRevenue, data for number of orders chart, data for revenue chart, and data for services vs items, and data for heatmap



  public day = Array(24).fill([0, 0, 0, 0, 0, 0]);
  /* 
 [0] total Number of orders,
 [1] total Revenue,
 [2] Number of itemOrders,
 [3] revenue of itemOrders, 
 [4] Number of serviceOrders, 
 [5] revenue of serviceOrders
 
 */
  public monthT1 = Array(31).fill(this.day);
  public monthT2 = Array(30).fill(this.day);
  public monthT3 = Array(29).fill(this.day);
  public monthT4 = Array(28).fill(this.day);
  public yearT1 = [Array.from(this.monthT1), Array.from(this.monthT4), Array.from(this.monthT1),
  Array.from(this.monthT2), Array.from(this.monthT1), Array.from(this.monthT2),
  Array.from(this.monthT1), Array.from(this.monthT1), Array.from(this.monthT2),
  Array.from(this.monthT1), Array.from(this.monthT2), Array.from(this.monthT1)
  ];
  public yearT2 = [Array.from(this.monthT1), Array.from(this.monthT3), Array.from(this.monthT1),
  Array.from(this.monthT2), Array.from(this.monthT1), Array.from(this.monthT2),
  Array.from(this.monthT1), Array.from(this.monthT1), Array.from(this.monthT2),
  Array.from(this.monthT1), Array.from(this.monthT2), Array.from(this.monthT1)
  ];

  addYear(year) {
    if (year % 4 == 0) {
      this.data[year] = Array.from(this.yearT2);
    }
    else {
      this.data[year] = Array.from(this.yearT1);
    }
  };




  getData() {
      this.serviceServ.getServices().subscribe((services) => {
        this.serviceStore = services
        for (let service of this.serviceStore) {
          let date = new Date(service.pickUpDateTime);
          let hour = date.getHours() - 1;
          let day = date.getDate() - 1;
          let month = date.getMonth();
          let year = date.getFullYear();
          if (!this.years.has(year)) {
            this.addYear(year)
          }

          let price = 0;
          if (service.serviceType.indexOf('Major') > -1) {
            price = 20;
          }

          else if (service.serviceType.indexOf('Major') > -1) {
            price = 10;
          }

          this.data[year][month][day][hour][0] += 1
          this.data[year][month][day][hour][1] += price
          this.data[year][month][day][hour][4] += 1
          this.data[year][month][day][hour][5] += price


          /*
          [0] total Number of orders, (+1)
          [1] total Revenue, (+price)
          [4] Number of serviceOrders, (+1)
          [5] revenue of serviceOrders (+price)
          */

          console.log(this.data[year][month])
        }
      })

      this.orderServ.getOrders().subscribe((orders) => {
        this.dataStore = orders
        for (let order of this.dataStore) {
          let date = new Date(order.Date);
          let hour = date.getHours() - 1;
          let day = date.getDate() - 1;
          let month = date.getMonth();
          let year = date.getFullYear();
          if (!this.years.has(year)) {
            this.addYear(year);
          }

          let price = order.totalPrice;

          this.data[year][month][day][hour][0] += 1
          this.data[year][month][day][hour][1] += price
          this.data[year][month][day][hour][2] += 1
          this.data[year][month][day][hour][3] += price


          /* 
          [0] total Number of orders,
          [1] total Revenue,
          [2] Number of itemOrders,
          [3] revenue of itemOrders, 
          */

        }

      })


  }

  // only to be used by other functions
  calculateData(period, dataType) {
    console.log(this.data);
    let data: number[] = [];
    let p = period.split("-");
    if (p.length == 1) {
      // then calculate for the year given in p[0]
      for (let month of this.data[Number(p[0])]) {
        let sum = 0;
        for (let day of month) {
          for (let hour of day) {
            sum += hour[dataType];
          }
        }
        data.push(sum);
      }
    }

    else if (p.length == 2) {

      // calculate for the month given in p[1] of the year given in p[0]
      for (let day of this.data[Number(p[0])][Number(p[1])]) {
        let sum = 0;
        for (let hour of day) {
          sum += hour[dataType];
        }
        data.push(sum)
      }
    }
    return data;


  }


  /* 
    [0] total Number of orders,
    [1] total Revenue,
    [2] Number of itemOrders,
    [3] revenue of itemOrders, 
    [4] Number of serviceOrders, 
    [5] revenue of serviceOrders
    
    */

  NumberOfOrdersData(period: string) {
    // dataType = [0]
    return this.calculateData(period, 0);
  }

  AmountOfRevenueData(period: string) {
    // dataType = [1]
    return this.calculateData(period, 1);
  }

  NumberOfItemOrdersData(period: string) {
    // dataType = [2]
    return this.calculateData(period, 2);
  }

  RevenueOfItemOrdersData(period: string) {
    // dataType = [3]
    return this.calculateData(period, 3);
  }

  NumberOfServiceOrdersData(period: string) {
    // dataType = [4]
    return this.calculateData(period, 4);
  }

  RevenueOfServiceOrdersData(period: string) {
    // dataType = [5]
    return this.calculateData(period, 5);
  }

  Sum(x: number[]) {
    let sum = 0;
    for (let v of x) {
      sum += v;
    }
    return sum;
  }

  totalOrders(period: string) {
    return this.Sum(this.NumberOfOrdersData(period));
  }

  totalRevenue(period: string) {
    return this.Sum(this.AmountOfRevenueData(period));
  }

  totalItemOrders(period: string) {
    return this.Sum(this.NumberOfItemOrdersData(period));
  }

  totalServiceOrders(period: string) {
    return this.Sum(this.NumberOfServiceOrdersData(period));
  }


  formatPeriod(selectedPeriod: string) {
    let period: string;
    let d = new Date();
    if (selectedPeriod == 'thisMonth') {
      period = d.getFullYear().toString() + '-' + (d.getMonth()).toString()
    }
    else if (selectedPeriod == 'thisYear') {
      period = d.getFullYear().toString()
    }
    return period;

  }



  resetHeatmapData() {
    this.heatmapData = Array.from(this.heatmapDataTemp);
  }

  getHeatmapData(period: string) {
    this.resetHeatmapData();
    if (period.split('-').length > 1) {
      let year = Number(period.split('-')[0]);
      let month = Number(period.split('-')[1]);
      for (let day of this.data[year][month]) {
        for (let hour of day) {
          let d = new Date(year, month, day + 1);
          console.log(this.data[year][month][day][hour][0]);
          this.heatmapData[hour][d.getDay()] += this.data[year][month][day][hour][0]
        }
      }

    }
    else {
      let year = Number(period.split('-')[0]);
      for (let month of this.data[year])
        for (let day of month) {
          for (let hour of day) {
            let d = new Date(year, month, day);
            this.heatmapData[hour][d.getDay()] += this.data[year][month][day][hour][0]
          }
        }
    }
    return this.heatmapData;
  }

  getLabels(period: string) {
    let labels: string[];
    if (period.split('-').length > 1) {
      let year = Number(period.split('-')[0]);
      let month = Number(period.split('-')[1]);
      for (let i = 1; i < this.data[year][month].length; i++) {
        labels.push(i.toString());
      }
    }
    else {
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
    return labels;
  }





}


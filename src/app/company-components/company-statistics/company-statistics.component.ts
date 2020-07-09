import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company-service/company-service.service';


@Component({
  selector: 'company-statistics',
  templateUrl: './company-statistics.component.html',
  styleUrls: ['./company-statistics.component.css']
})
export class CompanyStatistics implements OnInit {

  orders : any[];
  dataChart;
  
  chartData = [];
  dataSource : Object;


  constructor(private companyService : CompanyService) {
    this.companyService.getOrderStatistics().subscribe(result=>{
        this.orders = result;
        let date = new Date();
        let time = date.getTime();
        for(let i=0;i<30;i++){
          this.chartData[i]={label : `${i+1}`, value : 0};
        }
        for(let i in this.orders){
          let date2 = new Date(this.orders[i].time);
          let time2 = date2.getTime();

          let diff = (time-time2)/1000/60/60/24;
          if(diff<30){
            this.chartData[Math.floor(30-diff)].value++;
          }  
        }
        for(let i in this.chartData){
          this.chartData[i].value = `${this.chartData[i].value}`
        }
        let dataSource = {
          chart: {
            caption: "Broj narudzbina po danima u prethodnih 30 dana", //Set the chart caption
            subCaption: "", //Set the chart subcaption
            xAxisName: "Dani", //Set the x-axis name
            yAxisName: "Narudzbine", //Set the y-axis name
            numberSuffix: "",
            theme: "fusion" //Set the theme for your chart
          },
          // Chart Data - from step 2
          data : this.chartData
        };

        this.dataSource = dataSource;


        console.log(this.chartData);
    })
   }

  ngOnInit(): void {
  }

}

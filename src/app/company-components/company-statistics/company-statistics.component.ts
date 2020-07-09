import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company-service/company-service.service';


@Component({
  selector: 'company-statistics',
  templateUrl: './company-statistics.component.html',
  styleUrls: ['./company-statistics.component.css']
})
export class CompanyStatistics implements OnInit {

  orders : Object[];

  constructor(private companyService : CompanyService) {
    this.companyService.getOrderStatistics().subscribe(result=>{
        this.orders = result;
    })
   }

  dataSource  = [];

  ngOnInit(): void {
  }

}

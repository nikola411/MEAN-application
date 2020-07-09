import { Component, ViewChild } from "@angular/core";
import { HttpService } from 'src/app/services/http-service/http-service';
import { Router, ActivatedRoute } from '@angular/router';


import { ProductService } from '../../services/product-service/product-service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {CompanyService } from '../../services/company-service/company-service.service';

@Component({
    selector: 'company-products',
    templateUrl: 'company-products.component.html',
    styleUrls: ['./company-products.component.scss']
    

})
export class CompanyProducts {


    @ViewChild(MatTable) table : MatTable<any>;

    products : any[];
    tableSource = new MatTableDataSource<any>();
    displayedColumns = ['productId','type', 'name', 'quantity', 'options'];

    constructor(
        private http: HttpService,
        private router: Router,
        private route: ActivatedRoute,
        private companyService : CompanyService
        ) {
            this.companyService.getCompanyProducts().subscribe(result=>{
                this.products = result.shop;
                this.tableSource.data = this.products;
            })
            
          

            console.log("trebalo bi da se ucita tablea");


    }

    addProduct() {
        console.log("adding new pro")
        this.router.navigate(['/company/product/add']);
    }

    show(product) {
        this.companyService.setProduct(product.name);
        this.router.navigate(['company/product/show']);
    }

    delete(product) {

        let index = this.products.indexOf(product);
        this.products.splice(index,1);
        this.table.renderRows();
        this.companyService.removeProduct(product).subscribe(result => {
            
        })  
    }


}
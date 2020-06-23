import { Component, ViewChild } from "@angular/core";
import { HttpService } from 'src/app/services/http-service/http-service';
import { Router, ActivatedRoute } from '@angular/router';


import { ProductsService } from '../../services/products-service/products-service';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
    selector: 'company-products',
    templateUrl: 'company-products.component.html',
    styleUrls: ['./company-products.component.scss']
    

})
export class CompanyProducts {


    @ViewChild(MatTable) table : MatTable<any>;

    products : any[];
    tableSource = new MatTableDataSource<any>();
    displayedColumns = ['productId', 'name', 'quantity', 'options'];

    constructor(
        private http: HttpService,
        private router: Router,
        private route: ActivatedRoute,
        private productService: ProductsService
        ) {
            this.http.getCompanyProducts().subscribe(result=>{
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

    }

    delete(product) {

        this.http.removeProduct(product).subscribe(result => {
            console.log("refreshing");
            this.refresh();
            
        })  
    }


    private refresh(){
        this.http.getCompanyProducts().subscribe(result=>{
            this.products = result.shop;
            this.tableSource.data= this.products;
            this.table.renderRows();

        })
    }



}
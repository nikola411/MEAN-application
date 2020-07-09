import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service/product-service';
import { CompanyService } from 'src/app/services/company-service/company-service.service';

@Component({
  selector: 'company-product',
  templateUrl: './company-product.component.html',
  styleUrls: ['./company-product.component.css']
})
export class CompanyProductPage implements OnInit {

  product : any;
  rating : number = 0;
  numberOfRatings = 0;
  constructor(private companyService : CompanyService) {
    this.companyService.getProductPage().subscribe(result=>{
      console.log(result);
      this.product = result.product;
      let cnt = 0;
      if(this.product){
        for(let i in this.product.comments){
          if(this.product.comments[i].rating){
            cnt++;
            
            this.rating+=this.product.comments[i].rating;
          }
        }
        this.numberOfRatings = cnt;
        this.rating = this.rating / cnt;
      }
      
    })
  }

  hasComments(){
    if(this.product){
      if(this.product.comments.length > 0){
        return true;
      } else return false
    } else {
      return false;
    }
    
  }

  ngOnInit(): void {
  }

  hasRating(){
    if( this.numberOfRatings>0){
      return true;
    } else {
      return false;
    }
  }

}

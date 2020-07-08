import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http-service/http-service';

@Component({
  selector: 'my-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  alert : string ="";
  numberOfAlerts : number = null;

  constructor(private http : HttpService) { 
    this.http.getFooterInfo().subscribe(result=>{
      this.alert = result.alert;
      this.numberOfAlerts = result.number;
      if(this.numberOfAlerts == 0){
        this.numberOfAlerts = null;
      }
    })
  }

  ngOnInit(): void {
  }

}

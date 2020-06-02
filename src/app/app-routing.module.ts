import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputForm } from './input-form/input-form.component';
import { AppComponent } from './app.component';
import { RegisterForm } from './register-form/register-form.component';
import { UserComponent } from './user/user-component.component';
import { GardenForm }  from './garden-form/garden-form.component';


const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'login', component: InputForm },
  { path: 'register', component: RegisterForm},
 
  { path: 'user', component: UserComponent, children : [
    { path: 'garden-reg', component: GardenForm, outlet : 'userOut'}
   
    
   
    
  ]},
  { path: 'garden-reg', component: GardenForm, outlet : 'userOut'}


  //{ path : '**', component :AppComponent},
  

  // otherwise redirect to home
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
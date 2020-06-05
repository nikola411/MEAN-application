import { NgModule } from '@angular/core';
import { Routes, RouterModule, PRIMARY_OUTLET } from '@angular/router';

import { InputForm } from './input-form/input-form.component';
import { AppComponent } from './app.component';
import { RegisterForm } from './register-form/register-form.component';
import { UserComponent } from './user/user-component.component';
import { GardenForm } from './garden-form/garden-form.component';
import { AuthGuard } from './services/auth-guard/auth-guard-service';
import { GardenTable } from './garden-components/gardens-table.component/gardens-table.component';
import { SingleGarden } from './garden-components/single-garden.component/single-garden.component';


const routes: Routes = [
  { path: 'home', component: UserComponent },
  { path: 'login', component: InputForm, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterForm, canActivate: [AuthGuard] },

  {
    path: 'user', children: [
      {
        path: 'garden', children: [
          { path: 'registration', component: GardenForm },
          {
            path: 'show', children: [
              { path: 'all', component: GardenTable },
              { path : 'single', component : SingleGarden}
            ]
          }







        ]
      },
      //{ path: 'garden-reg', component: GardenForm},





      // otherwise redirect to home

    ]}
  ]
@NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
export class AppRoutingModule { }
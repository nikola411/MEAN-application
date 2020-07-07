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
import { Warehouse } from './warehouse/warehouse.component';
import { CompanyOrders } from './company-components/company-orders/company-orders.component';
import { CompanyProducts } from './company-components/company-products/company-products.component';
import { OrderSteps } from './company-components/company-product-steps/steps.component';
import { Shop } from './shop/shop/shop.component';
import { Users } from './admin-components/users.component.ts/users.component';
import { Requests } from './admin-components/requests/requests.component';
import { Product } from './shop/product/product.component';

const routes: Routes = [
  { path: 'home', component: UserComponent },
  { path: 'login', component: InputForm, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterForm, canActivate: [AuthGuard] },

  {
    path: 'user', canActivate : [AuthGuard], children: [
      {
        path: 'garden', children: [
          { path: 'registration', component: GardenForm },
          {
            path: 'show', children: [
              { path: 'all', component: GardenTable },
              { path: 'single', component: SingleGarden }
            ]
          }
        ]
      },
      {
        path: 'warehouse', component: Warehouse
      }
    ]
  },
  {
    path: "company",canActivate : [AuthGuard], children: [
      { path: "orders", component: CompanyOrders },
      { path : "products", component : CompanyProducts },
      { path : "product" , children : [
        {path : "add", component : OrderSteps}
      ]}
    ]
  },
  {path : "shop",canActivate : [AuthGuard], children:[
    {path : "all", component : Shop},
    {path : "product", component : Product}
  ]},
  {path : "admin",canActivate : [AuthGuard], children :[
    {
      path : "users", component : Users,
    },
    {
      path : "requests", component : Requests
    }
  ]}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';

import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { FormsModule } from '@angular/forms';

import { BotDetectCaptchaModule } from 'angular-captcha'; 
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import { InputForm } from './input-form/input-form.component';
import { RegisterForm } from './register-form/register-form.component';
import { GardenForm } from './garden-form/garden-form.component';
import { GardenTable } from './garden-components/gardens-table.component/gardens-table.component';
import { SingleGarden } from './garden-components/single-garden.component/single-garden.component';

import { Warehouse } from './warehouse/warehouse.component';

import { UserComponent } from './user/user-component.component';
import { ReactiveFormsModule } from '@angular/forms';

import { UserMenu } from './menu/user-menu/user-menu.component';

import { PlantDialog } from './dialogs/plant-dialog/plant-dialog.component';

import { CompanyMenu } from './menu/company-menu/company-menu.component';
import { CompanyOrders } from './company-components/company-orders/company-orders.component';
import { CompanyProducts } from './company-components/company-products/company-products.component';


import { HttpClientModule } from '@angular/common/http';
import { OrderSteps } from './company-components/company-product-steps/steps.component';
import { Shop } from './shop/shop/shop.component';
import { AdminMenu } from './menu/admin-menu/admin-menu.component';
import { Users } from './admin-components/users.component.ts/users.component';
import { Requests } from './admin-components/requests/requests.component';
import { Product } from './shop/product/product.component';

import { FooterComponent } from './footer/footer/footer.component';
import { ChangePasswordFormComponent } from './footer/change-password-form/change-password-form.component';
import { ProductDialog } from './dialogs/product-dialog/product-dialog.component';
import { CourierDialog } from './dialogs/courier-dialog/courier-dialog.component';
import { FusionChartsModule } from "angular-fusioncharts";
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import { CompanyStatistics } from './company-components/company-statistics/company-statistics.component';


FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
  declarations: [
    AppComponent,
    InputForm,
    RegisterForm,
    UserComponent,
    GardenForm,
    UserMenu,
    GardenTable,
    SingleGarden,
    Warehouse,
    PlantDialog,
    CompanyMenu,
    CompanyOrders,
    CompanyProducts,
    OrderSteps,
    Shop,
    AdminMenu,
    Users,
    Requests,
    Product,
    FooterComponent,
    ChangePasswordFormComponent,
    ProductDialog,
    CourierDialog,
    CompanyStatistics

  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BotDetectCaptchaModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    FusionChartsModule,
  




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

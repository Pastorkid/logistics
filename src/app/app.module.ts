import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLoginModule } from './login/admin-login.module';
import { AdminDashboardModule } from './dashboard/admin-dashboard.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminRequestModule } from './request/admin-request.module';
import { AdminDispatcherModule } from './dispatcher/admin-dispatcher.module';
import { AdminCustomerModule } from './customer/admin-customer.module';
import { AdminModeratorModule } from './moderator/admin-moderator.module';
import { SidenavbarModule } from './shared/sidenav.module';
import { CommonModule } from '@angular/common';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthInterceptor } from './shared/interceptor.interceptor';

//Decleration of  route path
const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/admin-login.module').then((m) => m.AdminLoginModule),
  },
  {
    path: 'board',
    loadChildren: () =>
      import('./dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
  },
  {
    path: 'request',
    loadChildren: () =>
      import('./request/admin-request.module').then(
        (m) => m.AdminRequestModule
      ),
  },
  {
    path: 'dispatcher',
    loadChildren: () =>
      import('./dispatcher/admin-dispatcher.module').then(
        (m) => m.AdminDispatcherModule
      ),
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/admin-customer.module').then(
        (m) => m.AdminCustomerModule
      ),
  },
  {
    path: 'moderator',
    loadChildren: () =>
      import('./moderator/admin-moderator.module').then(
        (m) => m.AdminModeratorModule
      ),
  },
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full',
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PagenotfoundComponent,
  },
];
@NgModule({
  declarations: [AppComponent, PagenotfoundComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    MatPaginatorModule,
    SidenavbarModule,
    AdminLoginModule,
    AdminDashboardModule,
    AdminRequestModule,
    AdminDispatcherModule,
    AdminCustomerModule,
    AdminModeratorModule,
    HttpClientModule,
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}

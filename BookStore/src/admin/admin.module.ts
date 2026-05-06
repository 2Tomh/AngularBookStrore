import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
import { AdminInfoComponent } from './admin-dashboard/admin-info/admin-info.component'
import { BookDiscountComponent } from './admin-dashboard/book-discount/book-discount.component'
import { BooksManagerComponent } from './admin-dashboard/books-manager/books-manager.component'
import { UserComponent } from './admin-dashboard/user/user.component'
import { RouterModule } from '@angular/router';
import {AdminLoginComponent} from './admin-login/admin-login.component'
import {AdminHomeComponent} from './admin-home/admin-home.component'
@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminDashboardComponent,
    UserComponent,
    BooksManagerComponent,
    AdminInfoComponent,
    BookDiscountComponent,
    AdminLoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    RouterModule
  ]
})
export class AdminModule { }

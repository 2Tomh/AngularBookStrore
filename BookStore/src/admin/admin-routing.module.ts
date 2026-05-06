import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
import { BookDiscountComponent } from './admin-dashboard/book-discount/book-discount.component'
import { BooksManagerComponent } from './admin-dashboard/books-manager/books-manager.component'
import { UserComponent } from './admin-dashboard/user/user.component'
import { AdminLoginComponent } from './admin-login/admin-login.component'
import { AdminHomeComponent } from './admin-home/admin-home.component'
import { AdminGuard } from '../app/guards/admin.guard'

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  {
    path: '',
    component: AdminHomeComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'dashboard', component: AdminDashboardComponent,
        children: [
          { path: 'books-manager', component: BooksManagerComponent },
          { path: 'users', component: UserComponent },
          { path: 'book-discount', component: BookDiscountComponent },
          { path: '', redirectTo: 'books-manager', pathMatch: 'full' },
        ]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from '../app/components/home-page/home-page.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { UserEntranceComponent } from './components/user-entrance/user-entrance.component'
import { SubscribeFormComponent } from './components/subscribe-form/subscribe-form.component'
import { LoginComponent } from './components/login/login.component'
import { CartPageComponent } from "./components/cart/cart-page.component";
import { AccountComponent } from './components/account/account.component'
import { AdminDashboardComponent } from "./components/admin/admin-dashboard/admin-dashboard.component";
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component'
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component'
import { AdminInfoComponent } from './components/admin/admin-dashboard/admin-info/admin-info.component'
import { UserDiscountComponent } from './components/admin/admin-dashboard/user-discount/user-discount.component'
import { BooksManagerComponent } from './components/admin/admin-dashboard/books-manager/books-manager.component'

import{BookDetailsPageComponent} from './components/book-details/book-details-page.component'

const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'cart', component: CartPageComponent,},
    { path: 'book/:id', component: BookDetailsPageComponent },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
    {
        path: 'user', component: UserEntranceComponent, children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'subscribe', component: SubscribeFormComponent },
        ]
    },
    { path: 'admin/login', component: AdminLoginComponent },
    {
        path: 'admin',
        component: AdminHomeComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: 'dashboard',
                component: AdminDashboardComponent,
                canActivate: [AdminGuard],
                children: [
                    { path: '', redirectTo: 'admin-info', pathMatch: 'full' },
                    { path: 'admin-info', component: AdminInfoComponent },
                    { path: 'user-discount', component: UserDiscountComponent },
                    { path: 'books-manager', component: BooksManagerComponent },
                ]
            },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
    ,
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
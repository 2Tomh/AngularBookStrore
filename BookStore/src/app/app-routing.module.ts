import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { HomePageComponent } from '../app/components/home-page/home-page.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { UserEntranceComponent } from './components/user-entrance/user-entrance.component'
import { SubscribeFormComponent } from './components/subscribe-form/subscribe-form.component'
import { LoginComponent } from './components/login/login.component'
import { CartPageComponent } from "./components/cart/cart-page.component"
import { BookDetailsPageComponent } from './components/book-details/book-details-page.component'

const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'cart', component: CartPageComponent, },
    { path: 'book/:id', component: BookDetailsPageComponent },
    {
        path: 'user', component: UserEntranceComponent, children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'subscribe', component: SubscribeFormComponent },
        ]
    },
    { path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule) },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
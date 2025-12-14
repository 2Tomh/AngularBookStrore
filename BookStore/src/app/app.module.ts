import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { SubscribeFormComponent } from './components/subscribe-form/subscribe-form.component';

import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchPageComponent } from './components/search/search-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { UserEntranceComponent } from './components/user-entrance/user-entrance.component';
import { LoginComponent } from './components/login/login.component'
import { CartPageComponent } from './components/cart/cart-page.component';
import { AccountComponent } from './components/account/account.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminInfoComponent } from './components/admin/admin-dashboard/admin-info/admin-info.component';
import { UserDiscountComponent } from './components/admin/admin-dashboard/user-discount/user-discount.component';
import { BooksManagerComponent } from './components/admin/admin-dashboard/books-manager/books-manager.component';
import {BookDetailsPageComponent} from './components/book-details/book-details-page.component'
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SubscribeFormComponent,
        HomePageComponent,
        PageNotFoundComponent,
        UserEntranceComponent,
        LoginComponent,
        SearchPageComponent,
        CartPageComponent,
        AccountComponent,
        AdminLoginComponent,
        AdminDashboardComponent,
        AdminHomeComponent,
        AdminInfoComponent,
        UserDiscountComponent,
        BooksManagerComponent,
        BookDetailsPageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

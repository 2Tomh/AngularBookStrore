import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { AppRoutingModule } from './app-routing.module'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'

import { SubscribeFormComponent } from './components/subscribe-form/subscribe-form.component'

import { HomePageComponent } from './components/home-page/home-page.component'
import { SearchPageComponent } from './components/search/search-page.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'

import { AuthInterceptors } from './services/auth.interceptor'
import { UserEntranceComponent } from './components/user-entrance/user-entrance.component'
import { LoginComponent } from './components/login/login.component'
import { CartPageComponent } from './components/cart/cart-page.component'
import { AccountComponent } from './components/account/account.component'
import {BookDetailsPageComponent} from './components/book-details/book-details-page.component';
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
        BookDetailsPageComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptors,
        multi:true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }

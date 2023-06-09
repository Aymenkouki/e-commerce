import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { FixItemComponent } from './fix-item/fix-item.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProdDetailComponent } from './prod-detail/prod-detail.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MenComponent } from './shop/men/men.component';
import { WomenComponent } from './shop/women/women.component';
import { BabyComponent } from './shop/baby/baby.component';
import { AccessoriesComponent } from './shop/accessories/accessories.component';
import { BagsComponent } from './shop/bags/bags.component';
import { AllComponent } from './shop/all/all.component';
import { CartComponent } from './cart/cart.component';
import { FavComponent } from './fav/fav.component';
import { OrdersComponent } from './orders/orders.component';
import { ModifieComponent } from './modifie/modifie.component';
import { MessagesComponent } from './messages/messages.component';
import { AddProdComponent } from './add-prod/add-prod.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ShopComponent,
    FixItemComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ProdDetailComponent,
    MenComponent,
    WomenComponent,
    BabyComponent,
    AccessoriesComponent,
    BagsComponent,
    AllComponent,
    CartComponent,
    FavComponent,
    OrdersComponent,
    ModifieComponent,
    MessagesComponent,
    AddProdComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

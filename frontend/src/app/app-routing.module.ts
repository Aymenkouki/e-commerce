import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { FavComponent } from './fav/fav.component';
import { HomeComponent } from './home/home.component';
import { ProdDetailComponent } from './prod-detail/prod-detail.component';
import { AccessoriesComponent } from './shop/accessories/accessories.component';
import { AllComponent } from './shop/all/all.component';
import { BabyComponent } from './shop/baby/baby.component';
import { BagsComponent } from './shop/bags/bags.component';
import { MenComponent } from './shop/men/men.component';
import { ShopComponent } from './shop/shop.component';
import { WomenComponent } from './shop/women/women.component';
import { OrdersComponent } from './orders/orders.component';
import { ModifieComponent } from './modifie/modifie.component';
import { MessagesComponent } from './messages/messages.component';
import { AddProdComponent } from './add-prod/add-prod.component';

const routes: Routes = [

  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'shop', component:ShopComponent, children:[
    {path:'',redirectTo:'/shop/all', pathMatch:'full'},
    {path: 'men', component:MenComponent},
    {path: 'women', component:WomenComponent},
    {path: 'baby', component:BabyComponent},
    {path: 'accessories', component:AccessoriesComponent},
    {path: 'bags', component:BagsComponent},
    {path: 'all', component:AllComponent},
    {path: 'modifie/:id', component:ModifieComponent},
    {path: 'addprod', component:AddProdComponent}
  ]},
  {path:'contact', component:ContactComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'detail/:id', component:ProdDetailComponent},
  {path: 'cart', component:CartComponent},
  {path: 'fav', component:FavComponent},
  {path: 'orders', component:OrdersComponent},
  {path: 'messages', component:MessagesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

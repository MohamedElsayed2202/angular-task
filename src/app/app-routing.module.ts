import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductComponent } from './components/product/product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'',component: LayoutComponent, children:[
    {path: 'home', component: HomeComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'products', component: ProductComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'products/add-product', component: AddProductComponent},
  
  ]},
  
  {path: 'user', loadChildren: () => import('src/app/user/user.module').then(user=>user.UserModule)},
  {path: '**', component: ErrorComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }

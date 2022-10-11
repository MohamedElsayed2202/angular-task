import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductComponent } from './components/product/product.component';
import { CategotyDropdownComponent } from './components/categoty-dropdown/categoty-dropdown.component';
import { TotalPriceComponent } from './components/total-price/total-price.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UniqueEmailDirective } from './directives/unique-email.directive';
import { SamePasswordDirective } from './directives/same-password.directive';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    NavbarComponent,
    ProductComponent,
    CategotyDropdownComponent,
    TotalPriceComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    ErrorComponent,
    ProductDetailsComponent,
    AddProductComponent,
    UniqueEmailDirective,
    SamePasswordDirective,
    LayoutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

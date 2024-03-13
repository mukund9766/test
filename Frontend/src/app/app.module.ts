import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductMasterComponent} from './product-master/product-master.component';
import { CategoryMasterComponent} from './category-master/category-master.component';

import {HttpClientModule} from '@angular/common/http'
import { ApiserviceService } from './apiservice.service';

@NgModule({
  declarations: [AppComponent, ProductMasterComponent, CategoryMasterComponent],
  imports: [BrowserModule,AppRoutingModule,HttpClientModule],
  // providers: [ApiserviceService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
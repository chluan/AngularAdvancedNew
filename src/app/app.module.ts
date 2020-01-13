import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ModelModule } from "./model/model.module"; 
import { CoreModule } from "./core/core.module"; 
import { TableComponent } from "./core/table.component"; 
import { FormComponent } from "./core/form.component"; 
import { MessageModule } from "./messages/message.module"; 
import { MessageComponent } from "./messages/message.component";


@NgModule({
  imports: [BrowserModule, ModelModule, CoreModule, MessageModule],  
  bootstrap: [TableComponent, FormComponent, MessageComponent]
})
export class AppModule { }

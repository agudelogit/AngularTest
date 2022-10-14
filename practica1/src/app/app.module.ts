import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DogsModule } from './dogs/dogs.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    DogsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

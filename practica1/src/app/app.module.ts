import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DogsModule } from './dogs/dogs.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    DogsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogsPageComponent } from './dogs-page/dogs-page.component';

@NgModule({
  declarations: [
    DogsPageComponent
  ],
  exports:[
    DogsPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DogsModule { }

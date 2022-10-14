import { Component } from '@angular/core';
import { DogsService } from '../../dogs/services/dogs.service';
import { ListDogsResponse } from '../../dogs/interface/dogs.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  get resultados(): ListDogsResponse[]{
    return this.dogsService.resultados; 
  }

  constructor( private dogsService: DogsService) { 
    console.log( this.dogsService.resultados );
  }
  
}

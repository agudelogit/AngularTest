import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListDogsResponse } from '../interface/dogs.interface';

@Injectable({
  providedIn: 'root'
})
export class DogsService {

  public resultados : ListDogsResponse[] = [];

  constructor(private http: HttpClient) {
    this.http.get<ListDogsResponse[]>( `https://api.thedogapi.com/v1/breeds` )
    .subscribe( (resp) => {
      console.log(resp)
      this.resultados = resp;
    })
  }
}

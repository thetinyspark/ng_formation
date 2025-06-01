import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public httpService = inject(HttpClient);
  constructor() { }

  public getProducts():Observable<Product[]>{
    return this.httpService.get<Product[]>("assets/json/products.json");
  }

  public getCart():Observable<Product[]>{
    return this.httpService.get<Product[]>("assets/json/cart.json");
  }
}

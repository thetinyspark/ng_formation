import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { map, Observable } from 'rxjs';
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

  public getProductById(id:number):Observable<Product|null>{
    return this.getProducts().pipe( 
      map(
        (products:Product[])=>{
          return products.find( p=>p.id == id) || null;
        }
      )
    );
  }

  public getCart():Observable<Product[]>{
    return this.httpService.get<Product[]>("assets/json/cart.json");
  }
}

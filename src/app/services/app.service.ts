import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _cartProductIds:number[] = [];
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

  public addToCart(product:Product):void{
    this._cartProductIds.push(product.id);
  }

  public getCart():Observable<Product[]>{
    return this.getProducts().pipe(
      map( 
        (products) => {
          return products.filter( p=> this._cartProductIds.includes(p.id))
        }
      )
    );
  }
}

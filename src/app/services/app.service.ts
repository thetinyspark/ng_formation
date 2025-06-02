import { inject, Injectable, Signal, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public httpService = inject(HttpClient);
  private _products = signal<Product[]>([]);

  constructor() { 
    this.refresh();
  }

  public refresh():void{
    this.httpService.get<Product[]>("assets/json/products.json").subscribe( 
      (products:Product[])=>{
        this._products.set(products);
      }
    );

    setTimeout( 
      ()=>{
        this.refresh();
      }, 
      10000
    );
  }

  public getProducts():Observable<Product[]>{
    return this.httpService.get<Product[]>("assets/json/products.json");
  }

  public getSignalProducts():Signal<Product[]>{
    return this._products;
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

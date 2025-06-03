import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _cartProductIds:number[] = [];
  private _connected:boolean = false;
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

  public isConnected():Promise<boolean>{
    return Promise.resolve(this._connected);
  }

  public login(credentials:any):Observable<boolean>{
    if( credentials.password === "test1234" && credentials.email === "admin@admin.com"){
      this._connected = true;
    }

    return of(this._connected);
  }
}

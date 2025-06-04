import { Component, inject } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Product } from '../../models/product.model';
import { NgForOf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private _appService = inject(AppService);
  private _route = inject(ActivatedRoute);
  public products:Product[] = [];
  public totalPrice:number = 0;
  public msg:string = "";

  constructor(){}
  ngOnInit(){
    this.products = this._route.snapshot.data["cart"] as Product[];
    this.msg = this._route.snapshot.data["msg"] as string;
    // this._appService.getCart().subscribe(
    //   (data:Product[])=>{
    //     this.products = data;
    //   }
    // );
  }
  ngOnDestroy(){}
}

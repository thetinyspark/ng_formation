import { Component, inject } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Product } from '../../models/product.model';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private _appService = inject(AppService);
  public products:Product[] = [];
  public totalPrice:number = 0;

  constructor(){}
  ngOnInit(){
    this._appService.getCart().subscribe(
      (data:Product[])=>{
        this.products = data;
      }
    );
  }
  ngOnDestroy(){}
}

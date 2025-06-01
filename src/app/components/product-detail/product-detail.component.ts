import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  public productId:number = 0;

  constructor( private _route:ActivatedRoute){

  }

  ngOnInit(){
    this._route.paramMap.subscribe(
       (params)=>{
        this.productId = parseInt(params.get('id') || "-1");
       }
    )
  }
}

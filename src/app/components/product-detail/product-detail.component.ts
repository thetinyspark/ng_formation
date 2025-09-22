import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { NgIf } from '@angular/common';
import { AppService } from '../../services/app.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  public productId:number = 0;
  public currentProduct:Product|null = null;
  private _appService:AppService = inject(AppService);

  constructor( private _route:ActivatedRoute){
  }

  async ngOnInit(){

    // // version 100% observable
    // this._route.paramMap.subscribe(
    //    (params)=>{
    //     this.productId = parseInt(params.get('id') || "-1");
    //     this._appService.getProductById(this.productId).subscribe( 
    //       (data:Product|null)=>{
    //         this.currentProduct = data;
    //       }
    //     );
    //    }
    // );

    // version avec les promesses
    const params = await firstValueFrom( this._route.paramMap );
    this.productId = parseInt(params.get('id') || "-1");
    this.currentProduct = await this._appService.getProductByIdPromise(this.productId);
  }
}

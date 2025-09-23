import { Component, effect, inject, signal } from '@angular/core';
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
  private _appService = inject(AppService);
  public currentProduct = this._appService.currentProduct;


  constructor( private _route:ActivatedRoute){
  }

  ngOnInit(){
    this._route.paramMap.subscribe(
      (params)=>{
        this._appService.setCurrentProductId(parseInt(params.get('id') || "-1"));
      }
    );
  }
}

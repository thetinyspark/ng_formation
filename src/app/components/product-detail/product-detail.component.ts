import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  private _productId = signal<number>(0);
  private _appService = inject(AppService);
  private _allProducts = this._appService.getSignalProducts();
  public currentProduct = computed( 
    ()=>{
      return this._allProducts().find(p=>p.id == this._productId()) || null;
    }
  );
  constructor( private _route:ActivatedRoute){}

  ngOnInit(){
    this._route.paramMap.subscribe(
      (params)=>{
      this._productId.set(parseInt(params.get('id') || "-1"));
      }
    );
  }
}

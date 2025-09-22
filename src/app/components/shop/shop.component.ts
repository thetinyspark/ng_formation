import { Component, inject } from '@angular/core';
import { CatalogComponent } from '../catalog/catalog.component';
import { NgForOf } from '@angular/common';
import { AppService } from '../../services/app.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgForOf, CatalogComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

  private _appService = inject(AppService);
  public products:Product[] = [];

  constructor(){}
  ngOnInit(){
    this._appService.getProducts().subscribe(
      (data:Product[])=>{
        this.products = data;
      }
    );
  }
}

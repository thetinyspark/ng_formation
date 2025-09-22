import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { AppService } from '../../services/app.service';
import { CatalogComponent } from '../catalog/catalog.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CatalogComponent],
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
  ngOnDestroy(){}
}

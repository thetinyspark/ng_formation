import { Component, effect, inject, signal } from '@angular/core';
import { CatalogComponent } from '../catalog/catalog.component';
import { NgForOf } from '@angular/common';
import { AppService } from '../../services/app.service';
import { Product } from '../../models/product.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgForOf, CatalogComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

  private _appService = inject(AppService);
  private _priceMin = signal<number>(0);
  private _priceMax = signal<number>(100);
  private _isTrendy = signal<boolean>(false);
  private _platform = signal<string>("All");
  private _allProducts = signal<Product[]>([]);

  public products:Product[] = [];
  public platforms:string[] = ["All", "PS5", "STEAM"];

  constructor(){
    effect( 
      ()=>{

        const min = this._priceMin();
        const max = this._priceMax();
        const trendy = this._isTrendy();
        const platform = this._platform();
        const products = this._allProducts();
        this.products = products.filter( 
          (product:Product)=>{
            if( trendy && !product.trendy)
              return false;

            if( platform != "All" && product.device != platform)
              return false;

            return ( product.price >= min && product.price <= max );
          }
        );

      }
    );
  }

  async ngOnInit(){
    this._allProducts.set( await firstValueFrom( this._appService.getProducts() ) );
  }
  

  onPriceMinChange( data:any){ 
    this._priceMin.set( parseInt( data.value ) );
  }

  onPriceMaxChange( data:any){ 
    this._priceMax.set( parseInt( data.value ) );
  }

  onTrendChange( data:any){ 
    this._isTrendy.set( data.checked );
  }

  onPlatformChange( data:any ){
    this._platform.set( data.value );
  }
}

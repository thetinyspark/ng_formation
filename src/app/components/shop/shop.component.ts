import { Component, effect, inject, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CatalogComponent } from '../catalog/catalog.component';
import { AppService } from '../../services/app.service';
import { NgFor, NgForOf } from '@angular/common';
import { ProductNamePipe } from '../../pipes/product-name.pipe';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FormsModule, CatalogComponent, NgForOf, ProductNamePipe],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  private _allProducts = signal<Product[]>([]);
  private _appService: AppService = inject(AppService);
  public platforms: string[] = [];
  public selectedPlatform = signal<string>('All');
  public products: Product[] = [];
  public gameName: string = '';

  constructor() {
    effect(
      ()=>{
        this.products = this._allProducts().filter(
          (product)=>{
            if( this.selectedPlatform() == 'All')
              return true;

            return product.device.toLowerCase() == this.selectedPlatform().toLowerCase();
          }
        );

        // unique
        this.platforms = Array.from(new Set(this._allProducts().map((p) => p.device)));

        // add All category
        this.platforms.unshift("All");
      }
    );
  }

  ngOnInit() {
    this._appService.getProducts().subscribe((products) => {
      this._allProducts.set(products);
    });
  }

  public onPlatformChange(event:any){
    this.selectedPlatform.set(event.target.value);
  }
}

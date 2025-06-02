import { Component, computed, inject, signal } from '@angular/core';
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
  public totalPrice = computed( 
    ()=>{
      let total = 0; 
      this.products.forEach( p=>total+=p.price);
      return Math.round( total + ( total * this.tva() / 100 ) );
    }
  );
  public tva = signal<number>(0);

  constructor(){}

  ngOnInit(){
    this._appService.getProducts().subscribe( 
      (products:Product[])=>{
        this.products = products;
        this.tva.set(5);
      }
    )
  }

  upgradeTVA(){
    this.tva.set( this.tva() + 1);
  }

  downgradeTVA(){
    this.tva.set( this.tva() - 1);
  }
}

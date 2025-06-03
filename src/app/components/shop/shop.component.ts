import { Component, computed, inject, signal } from '@angular/core';
import { AppService } from '../../services/app.service';
import { CatalogComponent } from '../catalog/catalog.component';
import { DummyService } from '../../services/dummy.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CatalogComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  private _appService = inject(AppService);
  private _dummy = inject(DummyService);
  public products = this._appService.getSignalProducts();
  public totalPrice = computed( 
    ()=>{
      let total = 0; 
      this.products().forEach( p=>total+=p.price);
      return Math.round( total + ( total * this.tva() / 100 ) );
    }
  );
  public tva = signal<number>(5);

  constructor(){
    this._dummy.run();
  }
}

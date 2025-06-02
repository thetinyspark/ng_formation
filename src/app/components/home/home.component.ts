import { Component, computed, inject } from '@angular/core';
import { AppService } from '../../services/app.service';
import {  NgForOf } from '@angular/common';
import { CatalogComponent } from '../catalog/catalog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgForOf, CatalogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private _appService = inject(AppService);
  private _allProducts = this._appService.getSignalProducts();;
  public products = computed( 
    ()=>{
      return this._allProducts().filter(p=>p.trendy == true);
    }
  );
   

  constructor(){}
  ngOnInit(){}
  ngOnDestroy(){}
}
import { Component, inject } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Product } from '../../models/product.model';
import { NgFor, NgForOf } from '@angular/common';
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
  public products:Product[] = [];

  constructor(){}
  ngOnInit(){
    this._appService.getProducts().subscribe(
      (data:Product[])=>{
        this.products = data.filter( p=>p.trendy == true );
      }
    );
  }
  ngOnDestroy(){}
}
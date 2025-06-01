import { Component, inject } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Product } from '../../models/product.model';
import { NgFor, NgForOf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgForOf],
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
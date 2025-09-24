import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'PricePipe',
  standalone: true
})
export class PricePipe implements PipeTransform {

  transform( data:Product[], min:number = 0, max:number = 0): unknown {
    return data.filter(
      (p:Product)=>{
        return p.price >= min && p.price <= max;
      }
    );
  }

}

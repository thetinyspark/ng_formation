import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'ProductNamePipe',
  standalone: true
})
export class ProductNamePipe implements PipeTransform {

  transform(data: Product[], name:string ): any {

    if( name == "")
      return data;

    return data.filter( p=>p.name.toLowerCase().includes(name.toLowerCase()));
  }

}

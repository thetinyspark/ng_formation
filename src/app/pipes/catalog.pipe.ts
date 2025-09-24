import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductNamePipe } from './product-name.pipe';
import { PricePipe } from './price.pipe';

@Pipe({
  name: 'CatalogFilter',
  standalone: true
})
export class CatalogPipe implements PipeTransform {

  transform( data:Product[], filters:any = {}): Product[] {
    let results = new ProductNamePipe().transform(data, filters.gameName || "");
    results = new PricePipe().transform(results, filters.priceMin || 0, filters.priceMax || 0);
    return results;
  }

}

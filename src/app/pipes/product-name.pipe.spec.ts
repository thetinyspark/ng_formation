import { Product } from '../models/product.model';
import { ProductNamePipe } from './product-name.pipe';

fdescribe('ProductNamePipe test suite', () => {

  const PRODUCTS_MOCK:Product[] = [
      {
        device: "gameboy color", 
        id: 1, 
        name: "Kirby's Adventure", 
        picture: "",
        price: 100, 
        trendy: true
      },
      {
        device: "nintendo switch", 
        id: 1, 
        name: "Pacman", 
        picture: "",
        price: 100, 
        trendy: true
      }
  ]


  it('should be able to create an instance', () => {
    const pipe = new ProductNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('should be able to filter products by name', () => {
    const pipe = new ProductNamePipe();
    const result = pipe.transform(PRODUCTS_MOCK, "Adventure");
    expect(result.length).toBeGreaterThan(0);

    result.forEach( 
      (product:Product)=>{
        expect(product.name).toContain("Adventure");
      }
    );
  });

  it('should not filter if search string contains one empty space', () => {
    const pipe = new ProductNamePipe();
    const result = pipe.transform(PRODUCTS_MOCK, " ");
    expect(result.length).toEqual(PRODUCTS_MOCK.length);

    result.forEach( 
      (product:Product, index:number)=>{
        expect(product).toEqual(PRODUCTS_MOCK[index]);
      }
    );
  });

});

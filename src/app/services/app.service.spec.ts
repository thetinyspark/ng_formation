import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { Product } from '../models/product.model';
import { firstValueFrom, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

fdescribe('AppService', () => {
  const PRODUCTS_MOCK: Product[] = [
    {
      device: 'gameboy color',
      id: 1,
      name: "Kirby's Adventure",
      picture: '',
      price: 100,
      trendy: true,
    },
    {
      device: 'nintendo switch',
      id: 1,
      name: 'Pacman',
      picture: '',
      price: 100,
      trendy: true,
    },
  ];
  let service: AppService;
  let fakeHttpClient = {
    get: <T>(url: string) => of(PRODUCTS_MOCK) ,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // TP: trouver comment injecter notre fakeHttpClient à la place du vrai
        {provide: HttpClient, useValue: fakeHttpClient}
      ]
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should returns all products', async () => {
    // given
    // when 
    const products = await firstValueFrom( service.getProducts() );

    // then
    expect(products).toEqual(PRODUCTS_MOCK);
  });

  it('should not returns all products', async () => {
    // given
    const spy1 = spyOn(fakeHttpClient, "get").and.returnValue(of([]));
    // when 
    const products = await firstValueFrom( service.getProducts() );

    // then
    expect(products).not.toEqual(PRODUCTS_MOCK);
    expect(products.length).toEqual(0);
    expect(spy1).toHaveBeenCalled();
  });
});

import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { Product } from '../models/product.model';
import { of } from 'rxjs';

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
      ]
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  provideRouter,
  RouterStateSnapshot,
} from '@angular/router';

import { isConnectedGuard } from './is-connected.guard';
import { importProvidersFrom } from '@angular/core';
import { AppService } from '../services/app.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { Product } from '../models/product.model';

fdescribe('isConnectedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isConnectedGuard(...guardParameters));

  var httpClient: HttpClient;
  var service: AppService;
  var activatedRoute = {} as ActivatedRouteSnapshot;
  var routeSnapshot = {} as RouterStateSnapshot;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [importProvidersFrom(HttpClientModule)],
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if isConnected = true and there is a non empty cart', async () => {
    // given
    const spy = spyOn(service, 'isConnected').and.resolveTo(true);
    const spy2 = spyOn(service, 'getCart').and.returnValue(of(PRODUCTS_MOCK));

    //when
    const result = await executeGuard(activatedRoute, routeSnapshot);

    //then
    expect(result).toBeTrue();
  });

  it('should return false if isConnected = true and there is an empty cart', async () => {
    // given
    const spy = spyOn(service, 'isConnected').and.resolveTo(true);
    const spy2 = spyOn(service, 'getCart').and.returnValue(of([]));

    // when
    const result = await executeGuard(activatedRoute, routeSnapshot);

    // then
    expect(result).toBeFalse();
  });

  it('should return false if isConnected = false and there is a non empty cart', async () => {
    // given
    const spy = spyOn(service, 'isConnected').and.resolveTo(false);
    const spy2 = spyOn(service, 'getCart').and.returnValue(of(PRODUCTS_MOCK));

    // when
    const result = await executeGuard(activatedRoute, routeSnapshot);
    
    // then
    expect(result).toBeFalse();
  });
});

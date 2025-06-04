import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { getCartResolver } from './get-cart.resolver';

describe('getCartResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => getCartResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { timeoutResolver } from './timeout.resolver';

describe('timeoutResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => timeoutResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

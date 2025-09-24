import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { isItMondayGuard } from './is-it-monday.guard';
import { fakeMondayService, TEST_ENV } from '../../mocks/mocks';

fdescribe('isItMondayGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isItMondayGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({providers: TEST_ENV});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return the same value as fake.monday', () => {
    // given 
    var activatedRoute = {} as ActivatedRouteSnapshot;
    var routeSnapshot = {} as RouterStateSnapshot;
    // fakeMondayService.monday = true;

    const spy1 = spyOn(fakeMondayService, "isItMonday").and.returnValue(true);

    // when
    const results = executeGuard(activatedRoute, routeSnapshot);

    // then
    expect(results).toEqual(true);
    expect(spy1).toHaveBeenCalledOnceWith();
  });
});

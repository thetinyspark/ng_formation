import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MondayService } from '../services/monday.service';

export const isItMondayGuard: CanActivateFn = (route, state) => {
  const service = inject(MondayService);
  return service.isItMonday();
};

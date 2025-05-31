import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AppService } from './app.service';

export const userResolver: ResolveFn<any> = (route, state):Promise<any> => {
  const service = inject(AppService);
  return service.getUserData();
};

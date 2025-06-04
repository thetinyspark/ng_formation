import { CanActivateFn } from '@angular/router';
import { AppService } from '../services/app.service';
import { firstValueFrom } from 'rxjs';
import { inject } from '@angular/core';

export const notEmptyCartGuard: CanActivateFn = async (route, state):Promise<boolean> => {
  const service = (()=>inject(AppService))();
  const products = await firstValueFrom(service.getCart());
  return products.length > 0;
};

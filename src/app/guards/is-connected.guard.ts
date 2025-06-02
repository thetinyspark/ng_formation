import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { firstValueFrom } from 'rxjs';


export const isConnectedGuard: CanActivateFn = async (route, state):Promise<boolean> => {
  const service = (()=>inject(AppService))();
  // const router = (()=>inject(Router))();

  const loggedIn = await service.isConnected();
  const products = await firstValueFrom(service.getCart());
  return loggedIn && products.length > 0;
};

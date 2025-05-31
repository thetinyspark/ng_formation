import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppService } from '../services/app.service';


export const isConnectedGuard: CanActivateFn = async (route, state):Promise<boolean> => {
  const service = (()=>inject(AppService))();
  // const router = (()=>inject(Router))();

  return service.isConnected();
};

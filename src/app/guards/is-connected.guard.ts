// import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const isConnectedGuard: CanActivateFn = async (route, state):Promise<boolean> => {
  // const service = (()=>inject(GameService))();
  // const router = (()=>inject(Router))();
  return Promise.resolve(false);
};

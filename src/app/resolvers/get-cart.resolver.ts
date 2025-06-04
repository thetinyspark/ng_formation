import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AppService } from '../services/app.service';
import { Product } from '../models/product.model';
import { firstValueFrom } from 'rxjs';

export const getCartResolver: ResolveFn<Product[]> = async (route, state) => {

  const element = document.querySelector(".spinner")! as HTMLElement;
  element.style.display = "block";
  
  const service = inject(AppService);
  const cart = await firstValueFrom(service.getCart());
  element.style.display = "none";
  return cart;
};

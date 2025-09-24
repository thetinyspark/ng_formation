import { MondayService } from '../app/services/monday.service';

class FakeMondayService {
  public monday: boolean = false;
  public isItMonday(): boolean {
    return this.monday;
  }
}

export const fakeMondayService = new FakeMondayService();

export const TEST_ENV = [{ provide: MondayService, useValue: fakeMondayService }];

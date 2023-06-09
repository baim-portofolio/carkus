import { Campus } from '@prisma/client';

export class ResultCreate {
  success: boolean;
  message: string;
  data: Campus | Campus[] = []; // Memberikan nilai awal berupa array kosong

  constructor(success: boolean, message: string, result: Campus | Campus[]) {
    this.success = success;
    this.message = message;
    this.data = result;
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class MockUser {
  constructor() { }

  getUsers(): Array<{}> {
      return [
          {
              name: 'test',
              email: 'test@gmail.com'
          }
      ];
  }
}
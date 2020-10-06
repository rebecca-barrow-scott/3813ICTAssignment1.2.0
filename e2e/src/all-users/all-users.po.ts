import { browser, by, element } from 'protractor';

export class UserPage {
  private credentials = {
    username: 'test',
    email: 'test@gmail.com',
    role: 'User',
    password: '123'
  }
  navigateTo(){
    return browser.get('/allUser');
  }
  fillCredentials(credentials: any = this.credentials){

  }

  getPageTitleText(){
    return element(by.css('app-all-user h3')).getText();
  }
}

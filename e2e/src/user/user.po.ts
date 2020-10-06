import { browser, by, element } from 'protractor';

export class UserPage {
  navigateTo(){
    return browser.get('/user');
  }
  getUsername(){
    return element(by.css('h2')).getText();
  }
}

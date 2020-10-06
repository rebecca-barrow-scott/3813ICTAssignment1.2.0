import { browser, by, element } from 'protractor';

export class LoginPage {
  private credentials = {
    username: 'test',
    email: 'test@gmail.com',
    role: 'User',
    password: '123'
  }
  navigateTo(){
    return browser.get('/');
  }
  fillCredentials(credentials: any = this.credentials){
    element(by.css('[name="email"')).sendKeys(credentials.email)
    element(by.css('[name="password"')).sendKeys(credentials.password)
  }

  getPageTitleText(){
    return element(by.css('h1')).getText();
  }
  getErrorMessage(){
    return element(by.css('.feedback')).getText();
  }
}

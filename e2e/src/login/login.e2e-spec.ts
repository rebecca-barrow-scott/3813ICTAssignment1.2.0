import { LoginPage } from './login.po';
import { UserPage } from '../user/user.po';
;import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: LoginPage;
  let user: UserPage;
  beforeEach(() => {
    page = new LoginPage();
    user = new UserPage();
  });

  it('should display the page\'s name', () => {
    page.navigateTo();
    expect(page.getPageTitleText()).toEqual('Login');
  });
  it('should redirect to te user\'s profile', () => {
    page.navigateTo();
    page.fillCredentials();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

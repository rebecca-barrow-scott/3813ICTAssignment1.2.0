import { UserPage } from './user.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: UserPage;

  beforeEach(() => {
    page = new UserPage();
  });
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

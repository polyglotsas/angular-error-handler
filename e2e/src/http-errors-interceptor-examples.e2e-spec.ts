import { browser, logging } from 'protractor';

import { HttpErrorsInterceptorExamplesPage } from './http-errors-interceptor-examples.po';

describe('HTTP errors interceptor examples section', () => {
  let page: HttpErrorsInterceptorExamplesPage;

  beforeEach(async () => {
    page = new HttpErrorsInterceptorExamplesPage();
    await page.navigateTo();
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });

  it('should show a MatErrorDialog example', async () => {
    await page.showMatErrorDialogExample();
    const data = await page.getMatErrorDialogDisplayData();
    expect(data.title).toBe('Invalid data');
    expect(data.message).toBe('The password has the following error: must be at least 8 characters long');
    expect(data.closeButtonText).toBe('Ok');
  });

  it('should show a MatErrorSnackBar example', async () => {
    await page.showMatErrorSnackBarExample();
    const data = await page.getMatErrorSnackBarDisplayData();
    expect(data.message).toBe('An unexpected error occurred');
    expect(data.dismissButtonText).toBe('Ok');
  });
});

import { browser } from 'protractor';

export class ErrorPage {
  navigateTo(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}#/error`) as Promise<unknown>;
  }

  async isInPage(): Promise<boolean> {
    const currentUrl = await browser.getCurrentUrl();
    return currentUrl === `${browser.baseUrl}#/error`;
  }
}

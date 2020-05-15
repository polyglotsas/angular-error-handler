import { browser, $ } from 'protractor';

export interface MatErrorDialogDisplayData {
  title: string;
  message: string;
  closeButtonText: string;
}

export interface MatErrorSnackBarDisplayData {
  message: string;
  dismissButtonText: string;
}

export class HttpErrorsInterceptorExamplesPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  async showMatErrorDialogExample(): Promise<void> {
    await $('#produce-400-button').click();
  }

  async showMatErrorSnackBarExample(): Promise<void> {
    await $('#produce-500-button').click();
  }

  async getMatErrorDialogDisplayData(): Promise<MatErrorDialogDisplayData> {
    const title = await $('#mat-error-dialog-title').getText();
    const message = await $('#mat-error-dialog-message').getText();
    const closeButtonText = await $('#mat-error-dialog-close-button').getText();
    return {
      title,
      message,
      closeButtonText
    };
  }

  async getMatErrorSnackBarDisplayData(): Promise<MatErrorSnackBarDisplayData> {
    const message = await $('.mat-simple-snackbar span').getText();
    const dismissButtonText = await $('.mat-simple-snackbar button').getText();
    return {
      message,
      dismissButtonText
    };
  }
}

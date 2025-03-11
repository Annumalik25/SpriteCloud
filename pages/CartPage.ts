import { Page, Locator } from '@playwright/test';

export class CartPage {
     page: Page;
     checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.getByTestId('checkout');
    }
}

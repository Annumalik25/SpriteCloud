import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
     page: Page;
     firstName: Locator;
     lastName: Locator;
     postalCode: Locator;
     continueButton: Locator;
     finishButton: Locator;
     confirmationHeader: Locator;
     totalPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.getByTestId('firstName');
        this.lastName = page.getByTestId('lastName');
        this.postalCode = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.finishButton = page.getByTestId('finish');
        this.confirmationHeader = page.getByTestId('complete-header');
        this.totalPrice = page.getByTestId('subtotal-label');
    }

    async getTotalPrice(){
        const priceText = await this.totalPrice.textContent();    
        return parseFloat(priceText.replace('Item total: $', '').trim());
    }

    async fillCheckOutDetails(firstName:string, lastName:string, postalCode:string){
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async getConfirmationHeader() {
        return this.confirmationHeader.textContent();
    }
}

import { Page, Locator } from '@playwright/test';
import test from 'node:test';

export class InventoryPage {
     page: Page;
     cartIcon: Locator;
     sortDropdown: Locator;
     inventoryItems: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.getByTestId('shopping-cart-link');
        this.sortDropdown = page.getByTestId('product-sort-container');
        this.inventoryItems = page.getByTestId('inventory-item-name');
    }

    async addProductToCart(productName: string){
        return this.page.getByTestId(`add-to-cart-${productName}`).click();
    }

    async getProductPrice(productName: string){
        const price = await this.page.locator(`//div[@data-test="inventory-item-name" and text()="${productName}"]/ancestor::div[contains(@class, "inventory_item_description")]//div[@data-test="inventory-item-price"]`).textContent();
        return parseFloat(price?.replace('$', '') || '0');
    }
  
    async sortItemsByNameDescending() {
        await this.sortDropdown.selectOption('za');
    }

    async getItemNames() {
        return await this.inventoryItems.allTextContents();
    }
}

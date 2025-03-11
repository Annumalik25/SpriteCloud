import { test, expect } from '@playwright/test';
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import userData from '../../testdata/feTestData.json';

test.beforeEach('Given user is on Login Page', async ({page}) => {
    const loginPage = new LoginPage(page);
    loginPage.goto();
});

test.describe('Add items to cart, verify and checkout', () => {
    test('Add two items to cart, validate price and do checkout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await test.step('When I log in with valid credentials', async () => {
            await loginPage.loginUser(userData.validUser.Username, userData.validUser.Password);
            await loginPage.loginButton.click();
        });

        let backPackPrice: number;
        let tshirtPrice: number;

        await test.step('And I add two items to the cart and fetch their prices ', async () => {
            await inventoryPage.addProductToCart('sauce-labs-backpack');
            backPackPrice = await inventoryPage.getProductPrice('Sauce Labs Backpack');
            await inventoryPage.addProductToCart('sauce-labs-bolt-t-shirt');
            tshirtPrice = await inventoryPage.getProductPrice('Sauce Labs Bolt T-Shirt');
        });

        await test.step('And I navigate to the cart and proceed to checkout', async () => {
            await inventoryPage.cartIcon.click();
            await cartPage.checkoutButton.click();
        });

        await test.step('And I fill the checkout details and click on continue button', async () => {
            await checkoutPage.fillCheckOutDetails(userData.checkoutDetails.firstName, userData.checkoutDetails.lastName, userData.checkoutDetails.postalCode);
            await checkoutPage.continueButton.click();
        });
        
        await test.step('Then I verify the total price and complete the order and should see order confirmation message', async () => {
            const expectedTotalPrice = backPackPrice + tshirtPrice;
            const displayedPrice = await checkoutPage.getTotalPrice()
            expect(displayedPrice).toEqual(expectedTotalPrice);
            await checkoutPage.finishButton.click();
            expect(await checkoutPage.getConfirmationHeader()).toContain(userData.messages.orderConfirmation);
        });
    })
});

test('Sort items by name Z-A and validate sorting', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    
    await test.step('When I fill the valid credentials on login page and click on login button',async()=>{
        await loginPage.loginUser(userData.validUser.Username, userData.validUser.Password);
        await loginPage.loginButton.click();
    });

    await test.step('And I sort items in descending order from Z-A',async()=>{
        await inventoryPage.sortItemsByNameDescending();
    });

    await test.step('Then I validate that the sorting is correct',async()=>{
        const itemNames = await inventoryPage.getItemNames();
        const sortedNames = [...itemNames].sort().reverse();
        expect(itemNames).toEqual(sortedNames);
     });
});

test('Validate failed login attempt', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('When I fill the invalid credentials on login page and click on login button',async()=>{
        await loginPage.loginUser(userData.invalidUser.Username, userData.invalidUser.Password);
        await loginPage.loginButton.click();
    });
  
    await test.step('Then I verify the error message for wrong credentials ',async()=>{
        expect(await loginPage.getErrorMessage()).toContain(userData.messages.invalidLogin);
    });
});

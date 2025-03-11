import { Page, Locator } from '@playwright/test'

export class LoginPage {

    page: Page;
    username: Locator;
    password: Locator;
    loginButton: Locator;
    errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.getByTestId('username');
        this.password = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.errorMessage = page.getByTestId('error');
    }
    
    async goto(){
        await this.page.goto('');
    }

    async loginUser(userName:string, password:string){
        await this.username.fill(userName);
        await this.password.fill(password);
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}

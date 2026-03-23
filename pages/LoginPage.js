const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    // Definimos los selectores (Locators) en un solo lugar
    this.userInput = page.locator('[data-test="username"]');
    this.passInput = page.locator('[data-test="password"]');
    this.loginBtn = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(user, pass) {
    await this.userInput.fill(user);
    await this.passInput.fill(pass);
    await this.loginBtn.click();
  }
}

module.exports = { LoginPage };
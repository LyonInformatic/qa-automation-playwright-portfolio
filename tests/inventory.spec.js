const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Módulo Inventario', () => {

   test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

   test('Mostrar productos', async ({ page }) => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });
  
  test('Validar nombre y precio', async ({ page }) => {
    await expect(page.locator('.inventory_item_name').first()).toBeVisible();
    await expect(page.locator('.inventory_item_price').first()).toBeVisible();
  });


});
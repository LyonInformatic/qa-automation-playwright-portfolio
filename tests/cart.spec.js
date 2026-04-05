const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Módulo de Carrito', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('Agregar producto al carrito', async ({ page }) => {
    await page.click('.inventory_item button');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Ver producto en carrito', async ({ page }) => {
    await page.click('.inventory_item button');
    await page.click('.shopping_cart_link');

    await expect(page.locator('.cart_item')).toBeVisible();
  });

  test('Eliminar producto del carrito', async ({ page }) => {
    await page.click('.inventory_item button');
    await page.click('.inventory_item button'); // remove

    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });

});
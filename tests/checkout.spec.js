// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Módulo de Checkout', () => {

  test('Compra completa de producto', async ({ page }) => {
    const login = new LoginPage(page);

    // 🔐 Login
    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    // 🛒 Agregar producto
    await page.click('.inventory_item button');

    // 🛍 Ir al carrito
    await page.click('.shopping_cart_link');

    // 💳 Ir a checkout
    await page.click('#checkout');

    // 📝 Completar formulario
    await page.fill('#first-name', 'David');
    await page.fill('#last-name', 'Test');
    await page.fill('#postal-code', '1234');

    await page.click('#continue');

    // ✅ Validar resumen
    await expect(page.locator('.summary_info')).toBeVisible();

    // 🏁 Finalizar compra
    await page.click('#finish');

    // 🎉 Validar compra exitosa
    await expect(page.locator('.complete-header'))
      .toContainText('Thank you for your order');
  });

  test('Checkout con campos vacíos', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await page.click('.inventory_item button');
  await page.click('.shopping_cart_link');
  await page.click('#checkout');

  // No llenamos nada
  await page.click('#continue');

  await expect(page.locator('[data-test="error"]'))
    .toContainText('First Name is required');
});

});
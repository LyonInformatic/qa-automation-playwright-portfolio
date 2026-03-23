const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Módulo de Autenticación', () => {
  
  test('Login exitoso con usuario estándar', async ({ page }) => {
    const login = new LoginPage(page);
    
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    
    // Validación: que la URL cambie al inventario
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Login fallido con usuario bloqueado', async ({ page }) => {
    const login = new LoginPage(page);
    
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
    
    // Validación: que aparezca el mensaje de error
    await expect(login.errorMessage).toContainText('Sorry, this user has been locked out');
  });

  test('Login fallido con usuario y contraseña incorrectos', async ({ page }) => {
    const login = new LoginPage(page);
    
    await login.goto();
    await login.login('invalid_user', 'invalid_password');
    
    // Validación: que aparezca el mensaje de error
    await expect(login.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  });
});
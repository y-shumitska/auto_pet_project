// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../src/pages/login-page';

// test.describe('Login', () => {
//     test('login', async ({ browser }) => {
//         const context = await browser.newContext();
//         const page = await context.newPage();
//         const loginPage = new LoginPage(page, context);

//         await loginPage.goto();
//         await loginPage.login(process.env.LOGIN as string, process.env.PASSWORD as string);
//         await expect(loginPage.avatarButton).toBeVisible();
//     });
// });

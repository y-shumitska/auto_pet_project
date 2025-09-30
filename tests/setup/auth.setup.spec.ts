import { test as setup } from '@playwright/test';
import { LoginPage } from '../../imports';

setup('Authenticate and save state', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.LOGIN as string, process.env.PASSWORD as string);

    await page.context().storageState({ path: 'auth.json' });
});

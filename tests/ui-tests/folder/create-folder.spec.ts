import { test, expect, ProjectTestCasesPage } from '../../../imports';

test.use({ storageState: 'auth.json' });

test('Creation of a folder', async ({ page }) => {
    const projectTestCasesPage = new ProjectTestCasesPage(page);
    await projectTestCasesPage.goto();
    await projectTestCasesPage.createFolder();
    await expect(projectTestCasesPage.createdFolder).toBeVisible();
});

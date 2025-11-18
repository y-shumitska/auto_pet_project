import { test, expect, ProjectTestCasesPage, UpdateTestCasePage } from '../../../imports';

test.use({ storageState: 'auth.json' });

test('Deletion of a test case', async ({ page }) => {
    const projectTestCasesPage = new ProjectTestCasesPage(page);
    await projectTestCasesPage.goto();
    await projectTestCasesPage.deleteTestCase();

    await expect(projectTestCasesPage.updatedTestCaseTitle).not.toBeVisible();
});

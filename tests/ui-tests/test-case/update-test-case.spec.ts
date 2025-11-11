import { test, expect, ProjectTestCasesPage, UpdateTestCasePage } from '../../../imports';

test.use({ storageState: 'auth.json' });

test('Update of a test case', async ({ page }) => {
    const projectTestCasesPage = new ProjectTestCasesPage(page);
    await projectTestCasesPage.goto();
    await projectTestCasesPage.openCreatedTestCase();
    await projectTestCasesPage.openEditTestCasePage();

    const updateTestCasePage = new UpdateTestCasePage(page);
    await updateTestCasePage.updateTestCase();

    await expect(projectTestCasesPage.editedTestCase).toBeVisible();
});

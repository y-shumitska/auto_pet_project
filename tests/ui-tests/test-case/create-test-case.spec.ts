import { test, expect, ProjectTestCasesPage, TestCaseCreationPage } from '../../../imports';

test.use({ storageState: 'auth.json' });

test('Creation of a test case', async ({ page }) => {
    const projectTestCasesPage = new ProjectTestCasesPage(page);
    await projectTestCasesPage.goto();
    await projectTestCasesPage.openCreateTestCasePage();

    const testCaseCreationPage = new TestCaseCreationPage(page);
    await testCaseCreationPage.createTestCase();

    await expect(projectTestCasesPage.createdTestCaseTitle).toBeVisible();
});

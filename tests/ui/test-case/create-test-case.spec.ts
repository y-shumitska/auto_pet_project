import { test, expect, DashboardPage, ProjectTestCasesPage, TestCaseCreationPage } from '../../../imports';

test.use({ storageState: 'auth.json' });

test.describe('Creation of a test case', () => {
    test('creation of a test case', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.goto();
        await dashboardPage.createProject('New test project', 'NTP');
        await dashboardPage.openCreatedProject();

        const projectTestCasesPage = new ProjectTestCasesPage(page);
        await projectTestCasesPage.goto();
        await projectTestCasesPage.openCreateTestCasePage();

        const testCaseCreationPage = new TestCaseCreationPage(page);
        await testCaseCreationPage.createTestCase();

        await expect(projectTestCasesPage.createdTestCase).toBeVisible();
    });
});

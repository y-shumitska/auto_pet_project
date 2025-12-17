import { test, expect, DashboardPage, ProjectTestCasesPage, TestCaseCreationPage, UpdateTestCasePage, ProjectOverviewPage } from '../../imports';

test.use({ storageState: 'auth.json' });

test.describe.configure({ mode: 'serial' });

test('Creation of a project', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    dashboardPage.goto();
    await dashboardPage.createProject('New test project', 'NTP');

    await expect(dashboardPage.createdProject).toBeVisible();
});

test('Creation of a folder', async ({ page }) => {
    const projectTestCasesPage = new ProjectTestCasesPage(page);
    await projectTestCasesPage.goto();
    await projectTestCasesPage.createFolder();
    await expect(projectTestCasesPage.createdFolder).toBeVisible();
});

test('Creation of a test case', async ({ page }) => {
    const projectTestCasesPage = new ProjectTestCasesPage(page);
    const testCaseCreationPage = new TestCaseCreationPage(page);
    await projectTestCasesPage.goto();
    await projectTestCasesPage.openCreateTestCasePage();
    await testCaseCreationPage.createTestCase();

    await expect(projectTestCasesPage.createdTestCaseTitle).toBeVisible();
});

test('Update of a test case', async ({ page }) => {
    const projectTestCasesPage = new ProjectTestCasesPage(page);
    const updateTestCasePage = new UpdateTestCasePage(page);
    await projectTestCasesPage.goto();
    await projectTestCasesPage.openCreatedTestCase();
    await projectTestCasesPage.openUpdateTestCasePage();
    await updateTestCasePage.updateTestCase();

    await expect(projectTestCasesPage.updatedTestCaseTitle).toBeVisible();
});

test('Deletion of a test case', async ({ page }) => {
    const projectTestCasesPage = new ProjectTestCasesPage(page);
    await projectTestCasesPage.goto();
    await projectTestCasesPage.deleteTestCase();

    await expect(projectTestCasesPage.updatedTestCaseTitle).not.toBeVisible();
});

test('Deletion of a project', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const projectOverviewPage = new ProjectOverviewPage(page);
    dashboardPage.goto();
    await dashboardPage.openCreatedProject();
    await projectOverviewPage.deleteProject();
    await expect(dashboardPage.createdProject).toBeHidden();
});


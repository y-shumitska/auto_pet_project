import { test, expect, DashboardPage, ProjectOverviewPage } from '../../../imports';

test.use({ storageState: 'auth.json' });

test.describe('Deletion of a project', () => {
    test('Deletion of a project', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        dashboardPage.goto();
        await dashboardPage.openCreatedProject();

        const projectOverviewPage = new ProjectOverviewPage(page);
        await projectOverviewPage.deleteProject();
        await expect(dashboardPage.createdProject).toBeHidden();
    });
});

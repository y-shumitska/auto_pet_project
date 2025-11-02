import { test, expect, DashboardPage } from '../../../imports';

test.use({ storageState: 'auth.json' });

test.describe('Creation of a project', () => {
    test('Creation of a project', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        dashboardPage.goto();
        await dashboardPage.createProject('New test project', 'NTP');

        await expect(dashboardPage.createdProject).toBeVisible();
    });
});

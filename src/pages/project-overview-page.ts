import { Locator, Page } from '@playwright/test';

export class ProjectOverviewPage {
    private get editProjectButton(): Locator {
        return this.page.locator('[title="Edit project"]');
    }

    private get deleteProjectButton(): Locator {
        return this.page.locator('div[role="tooltip"]>ul li:nth-child(3)');
    }

    private get testCasesButton(): Locator {
        return this.page.locator('ul>li:nth-child(3)>a');
    }

    public get confirmButton(): Locator {
        return this.page.locator('[type="submit"]');
    }

    public constructor(private page: Page) {}

    public async goto(projectPrefix: string): Promise<void> {
        (await this.page.goto(`https://beedevs.eu1.qasphere.com/project/${projectPrefix}/overview`), { waitUntil: 'load' });
    }

    public async deleteProject(): Promise<void> {
        await this.goto('NTP');
        await this.editProjectButton.waitFor();
        await this.editProjectButton.click();
        await this.deleteProjectButton.waitFor();
        await this.deleteProjectButton.click();
        await this.confirmButton.waitFor();
        await this.confirmButton.click();
    }
}

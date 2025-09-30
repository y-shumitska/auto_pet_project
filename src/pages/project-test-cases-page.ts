import { Locator, Page } from '@playwright/test';

export class ProjectTestCasesPage {
    private get createTestCaseButton(): Locator {
        return this.page.locator('div > a[role="link"]');
    }

    public get createdTestCase(): Locator {
        return this.page.locator('[title="This is a test title"]');
    }

    public constructor(private page: Page) {}

    public async goto(): Promise<void> {
        (await this.page.goto('https://beedevs.eu1.qasphere.com/project/NTP/tcase'), { waitUntil: 'load' });
    }

    public async openCreateTestCasePage(): Promise<void> {
        await this.createTestCaseButton.waitFor();
        await this.createTestCaseButton.click();
    }
}

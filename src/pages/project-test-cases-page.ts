import { Locator, Page } from '@playwright/test';

export class ProjectTestCasesPage {
    private get createTestCaseButton(): Locator {
        return this.page.locator('div > a[role="link"]');
    }

    private get createFolderButton(): Locator {
        return this.page.locator('button', { hasText: 'Create Folder' });
    }

    private get newFolderPopup(): Locator {
        return this.page.locator('[role="document"]');
    }

    private get folderTitleInput(): Locator {
        return this.page.locator('form>div>div>input');
    }

    private get createFolderButtonInPopup(): Locator {
        return this.page.locator('[type="submit"]');
    }

    private get updateTestCaseButton(): Locator {
        return this.page.locator('[title="Edit test case"]');
    }

    private get testCaseMenuButton(): Locator {
        return this.page.locator('[title="Test case options"]');
    }

    private get deleteTestCaseButton(): Locator {
        return this.page.locator('[title="Test case options"]'
            + ' ~ div ul li >> button:has-text("Delete")');
    }

    private get deleteTestCasePopup(): Locator {
        return this.page.locator('p', { hasText: 'Are you sure you want to delete 1 test case?' });
    }

    private get deleteTestCaseYesButton(): Locator {
        return this.page.locator('button', { hasText: "Yes, I'm sure" });
    }

    public get createdFolder(): Locator {
        return this.page.locator('[title="Test folder"]');
    }

    public get createdTestCaseTitle(): Locator {
        return this.page.locator('[title="This is a test title"]');
    }

    public get updatedTestCaseTitle(): Locator {
        return this.page.locator('[title="This is a test title EDITED"]');
    }


    public constructor(private page: Page) { }

    public async goto(): Promise<void> {
        (await this.page.goto('https://beedevs.eu1.qasphere.com/project/NTP/tcase'), { waitUntil: 'load' });
    }

    public async openCreateTestCasePage(): Promise<void> {
        await this.createTestCaseButton.waitFor();
        await this.createTestCaseButton.click();
    }

    public async createFolder(): Promise<void> {
        await this.createFolderButton.waitFor();
        await this.createFolderButton.click({ force: true });
        await this.newFolderPopup.waitFor();
        await this.folderTitleInput.waitFor();
        await this.folderTitleInput.fill('Test folder');
        await this.createFolderButtonInPopup.click();
    }

    public async openCreatedTestCase(): Promise<void> {
        await this.createdTestCaseTitle.waitFor();
        await this.createdTestCaseTitle.click();
    }

    public async openUpdateTestCasePage(): Promise<void> {
        await this.updateTestCaseButton.waitFor();
        await this.updateTestCaseButton.click();
    }

    public async deleteTestCase(): Promise<void> {
        await this.updatedTestCaseTitle.waitFor();
        await this.updatedTestCaseTitle.click();
        await this.testCaseMenuButton.waitFor();
        await this.testCaseMenuButton.click();
        await this.deleteTestCaseButton.waitFor();
        await this.deleteTestCaseButton.click();
        await this.deleteTestCasePopup.waitFor();
        await this.deleteTestCaseYesButton.waitFor();
        await this.deleteTestCaseYesButton.click();
    }
}

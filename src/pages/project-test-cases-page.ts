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

    private get editTestCaseButton(): Locator {
        return this.page.locator('[title="Edit test case"]');
    }

    public get createdFolder(): Locator {
        return this.page.locator('[title="Test folder"]');
    }

    public get createdTestCase(): Locator {
        return this.page.locator('[title="This is a test title"]');
    }

    public get editedTestCase(): Locator {
        return this.page.locator('[title="This is a test title EDITED"]');
    }

    public constructor(private page: Page) {}

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
        await this.createdTestCase.waitFor();
        await this.createdTestCase.click();
    }

    public async openEditTestCasePage(): Promise<void> {
        await this.editTestCaseButton.waitFor();
        await this.editTestCaseButton.click();
    }
}

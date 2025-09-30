import { Locator, Page } from '@playwright/test';

export class DashboardPage {
    private get addProjectButton(): Locator {
        return this.page.locator('[data-testid="addProjectbtn"]');
    }

    private get submitButton(): Locator {
        return this.page.locator('form>div>button[type="submit"]');
    }

    private get titleInput(): Locator {
        return this.page.locator('input[name="title"]');
    }

    private get prefixInput(): Locator {
        return this.page.locator('input[name="id"]');
    }

    public get createdProject(): Locator {
        return this.page.locator('[title="New test project"]');
    }

    public constructor(private page: Page) {}

    public async goto(): Promise<void> {
        (await this.page.goto('https://beedevs.eu1.qasphere.com/dashboard'), { waitUntil: 'load' });
    }

    public async createProject(title: string, prefix: string): Promise<void> {
        await this.addProjectButton.waitFor();
        await this.addProjectButton.click();
        await this.titleInput.waitFor();
        await this.titleInput.fill(title);
        await this.prefixInput.fill(prefix);
        await this.submitButton.click();
    }

    public async openCreatedProject(): Promise<void> {
        await this.createdProject.waitFor();
        await this.createdProject.click();
    }
}

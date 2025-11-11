import { Locator, Page } from '@playwright/test';

export class UpdateTestCasePage {
    private get titleField(): Locator {
        return this.page.locator('input[placeholder="Test Case Title"]');
    }

    private get priorityMenu(): Locator {
        return this.page.locator('[class="grow whitespace-nowrap pl-3 text-start text-sm"]');
    }

    private get highButton(): Locator {
        return this.page.locator('[title="High"]');
    }

    private get tagsField(): Locator {
        return this.page.locator('[title="Enter tag"]');
    }

    private get requirementField(): Locator {
        return this.page.locator('[title="Select or create new"]');
    }

    private get preconditionField(): Locator {
        return this.page.locator('p', { hasText: 'This is a test precondition' });
    }

    private get stepOneField(): Locator {
        return this.page.locator('p', { hasText: 'This is a test action' });
    }

    private get expectedResultOneField(): Locator {
        return this.page.locator('p', { hasText: 'This is a test expected result' });
    }

    private get stepTwoField(): Locator {
        return this.page.locator('p', { hasText: 'This is a test step two' });
    }

    private get expectedResultTwoField(): Locator {
        return this.page.locator('p', { hasText: 'This is the second test expected result' });
    }

    private get updateButton(): Locator {
        return this.page.locator('[type="submit"]');
    }

    private get priorityButton(): Locator {
        return this.page.locator('div:has(> [for="priority"]) > .inputWrapper');
    }

    private get highPriorityButtonInList(): Locator {
        return this.page.locator('[Title = "High"]');
    }

    private get mediumPriorityButtonInList(): Locator {
        return this.page.locator('[Title = "Medium"]');
    }

    public constructor(private page: Page) {}

    public async updateTestCase(): Promise<void> {
        await this.titleField.waitFor();
        await this.titleField.fill('This is a test title EDITED');
        await this.priorityButton.waitFor();
        await this.priorityButton.click();
        await this.mediumPriorityButtonInList.waitFor();
        await this.mediumPriorityButtonInList.click();
        await this.preconditionField.waitFor();
        await this.preconditionField.fill('This is a test precondition EDITED');
        await this.stepOneField.waitFor();
        await this.stepOneField.fill('This is a test action EDITED');
        await this.expectedResultOneField.waitFor();
        await this.expectedResultOneField.fill('This is a test expected result EDITED');
        await this.stepTwoField.waitFor();
        await this.stepTwoField.fill('This is a test step two EDITED');
        await this.expectedResultTwoField.waitFor();
        await this.expectedResultTwoField.fill('This is the second test expected result EDITED');
        await this.updateButton.waitFor();
        await this.updateButton.click();
    }
}

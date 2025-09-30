import { Locator, Page } from '@playwright/test';

export class TestCaseCreationPage {
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
        return this.page.locator('[data-placeholder="Write something …"]').nth(0);
    }

    private get actionField(): Locator {
        return this.page.locator('[data-placeholder="Write something …"]').nth(0);
    }

    private get expectedResultField(): Locator {
        return this.page.locator('[data-placeholder="Write something …"]').nth(0);
    }

    private get addStepButton(): Locator {
        return this.page.locator('[title="Add step"]');
    }

    private get stepTwoField(): Locator {
        return this.page.locator('[data-placeholder="Write something …"]').nth(0);
    }

    private get expectedResultTwoField(): Locator {
        return this.page.locator('[data-placeholder="Write something …"]').nth(0);
    }

    private get createButton(): Locator {
        return this.page.locator('[type="submit"]');
    }

    public constructor(private page: Page) {}

    public async createTestCase(): Promise<void> {
        await this.titleField.waitFor();
        await this.titleField.fill('This is a test title');
        await this.preconditionField.waitFor();
        await this.preconditionField.fill('This is a test precondition');
        await this.actionField.waitFor();
        await this.actionField.fill('This is a test action');
        await this.expectedResultField.waitFor();
        await this.expectedResultField.fill('This is a test expected result');
        await this.addStepButton.waitFor();
        await this.addStepButton.click();
        await this.stepTwoField.waitFor();
        await this.stepTwoField.fill('This is a test step two');
        await this.expectedResultTwoField.waitFor();
        await this.expectedResultTwoField.fill('This is the second test expected result');
        await this.createButton.waitFor();
        await this.createButton.click();
    }
}

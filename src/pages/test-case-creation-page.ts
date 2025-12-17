import { Locator, Page } from '@playwright/test';

export class TestCaseCreationPage {
    private get titleField(): Locator {
        return this.page.locator('input[placeholder="Test case title"]');
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

    public async createTestCase(): Promise<void> {
        await this.titleField.waitFor();
        await this.titleField.fill('This is a test title');
        await this.priorityButton.waitFor();
        await this.priorityButton.click();
        await this.highPriorityButtonInList.waitFor();
        await this.highPriorityButtonInList.click();
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

    public async editTestCase(): Promise<void> {
        await this.titleField.waitFor();
        await this.titleField.fill('This is a test title EDITED');
        await this.priorityButton.waitFor();
        await this.priorityButton.click();
        await this.mediumPriorityButtonInList.waitFor();
        await this.mediumPriorityButtonInList.click();
        // await this.preconditionField.waitFor();
        // await this.preconditionField.fill('This is a test precondition EDITED');
        // await this.actionField.waitFor();
        // await this.actionField.fill('This is a test action EDITED');
        // await this.expectedResultField.waitFor();
        // await this.expectedResultField.fill('This is a test expected result EDITED');
        // await this.addStepButton.waitFor();
        // await this.addStepButton.click();
        // await this.stepTwoField.waitFor();
        // await this.stepTwoField.fill('This is a test step two EDITED');
        // await this.expectedResultTwoField.waitFor();
        // await this.expectedResultTwoField.fill('This is the second test expected result EDITED');
        await this.updateButton.waitFor();
        await this.updateButton.click();
    }
}

import { BrowserContext, Locator, Page } from '@playwright/test';
import * as fs from 'fs';

export class LoginPage {
    private get workEmailInput(): Locator {
        return this.page.locator('#email');
    }
    private get passwordInput(): Locator {
        return this.page.locator('#password');
    }
    private get loginButton(): Locator {
        return this.page.locator('button[type="submit"]');
    }

    public get avatarButton(): Locator {
        return this.page.locator('[data-testid="avatar"]');
    }

    public constructor(
        private page: Page,
        private context: BrowserContext
    ) {}

    public async goto(): Promise<void> {
        (await this.page.goto('https://beedevs.eu1.qasphere.com/login'), { waitUntil: 'load' });
    }

    public async login(email: string, password: string): Promise<void> {
        await this.goto();
        if (await this.avatarButton.isVisible()) {
            return;
        }
        await this.loginButton.waitFor();
        await this.workEmailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        const browserState = await this.context.storageState();
        fs.writeFileSync('browser-context.json', JSON.stringify(browserState, null, 2));
    }
}

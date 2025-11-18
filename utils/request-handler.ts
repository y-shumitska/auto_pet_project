import { APIRequestContext, test } from '@playwright/test';
import { APILogger } from './logger';

export class RequestHandler {
    private request: APIRequestContext;
    private logger: APILogger;
    private baseUrl!: string | undefined;
    private defaultBaseUrl: string;
    private apiPath = '';
    private queryParams: object = {};
    private apiHeaders: Record<string, string> = {};
    private apiBody: object = {};

    public constructor(request: APIRequestContext, apiBaseUrl: string, logger: APILogger) {
        this.request = request;
        this.defaultBaseUrl = apiBaseUrl;
        this.logger = logger;
    }

    public url(url: string): this {
        this.baseUrl = url;
        return this;
    }

    public path(path: string): this {
        this.apiPath = path;
        return this;
    }

    public params(params: object): this {
        this.queryParams = params;
        return this;
    }

    public headers(headers: Record<string, string>): this {
        this.apiHeaders = headers;
        return this;
    }

    public body(body: object): this {
        this.apiBody = body;
        return this;
    }

    public async getRequest(statusCode: number): Promise<any> {
        const url = this.getUrl();
        let responseJSON: any;

        await test.step(`GET request to: ${url}`, async () => {
            this.logger.logRequest('GET', url, this.apiHeaders);
            const response = await this.request.get(url, { headers: this.apiHeaders });
            const actualStatus = response.status();
            responseJSON = await response.json();

            this.logger.logResponse(actualStatus, responseJSON);
            this.statusCodeValidator(actualStatus, statusCode, this.getRequest);
        });

        this.cleanupFields();
        return responseJSON;
    }

    public async postRequest(statusCode: number): Promise<any> {
        const url = this.getUrl();
        let responseJSON: any;

        await test.step(`POST request to: ${url}`, async () => {
            this.logger.logRequest('POST', url, this.apiHeaders, this.apiBody);
            const response = await this.request.post(url, {
                headers: this.apiHeaders,
                data: this.apiBody
            });
            const actualStatus = response.status();
            responseJSON = await response.json();

            this.logger.logResponse(actualStatus, responseJSON);
            this.statusCodeValidator(actualStatus, statusCode, this.postRequest);
        });

        this.cleanupFields();
        return responseJSON;
    }

    public async putRequest(statusCode: number): Promise<any> {
        const url = this.getUrl();
        let responseJSON: any;

        await test.step(`PUT request to: ${url}`, async () => {
            this.logger.logRequest('PUT', url, this.apiHeaders, this.apiBody);
            const response = await this.request.put(url, {
                headers: this.apiHeaders,
                data: this.apiBody
            });
            const actualStatus = response.status();
            responseJSON = await response.json();

            this.logger.logResponse(actualStatus, responseJSON);
            this.statusCodeValidator(actualStatus, statusCode, this.putRequest);
        });

        this.cleanupFields();
        return responseJSON;
    }

    public async patchRequest(statusCode: number): Promise<any> {
        const url = this.getUrl();
        let responseJSON: any;

        await test.step(`PATCH request to: ${url}`, async () => {
            this.logger.logRequest('PATCH', url, this.apiHeaders, this.apiBody);
            const response = await this.request.patch(url, {
                headers: this.apiHeaders,
                data: this.apiBody
            });
            const actualStatus = response.status();
            responseJSON = await response.json();

            this.logger.logResponse(actualStatus, responseJSON);
            this.statusCodeValidator(actualStatus, statusCode, this.patchRequest);
        });

        this.cleanupFields();
        return responseJSON;
    }

    public async deleteRequest(statusCode: number): Promise<any> {
        const url = this.getUrl();
        let responseJSON: any;

        await test.step(`DELETE request to: ${url}`, async () => {
            this.logger.logRequest('DELETE', url, this.apiHeaders, this.apiBody);
            const response = await this.request.delete(url, { headers: this.apiHeaders, data: this.apiBody });
            const actualStatus = response.status();
            // responseJSON = await response.json();
            const bodyBuffer = await response.body();
            if (bodyBuffer && bodyBuffer.length > 0) {
                try {
                    responseJSON = JSON.parse(bodyBuffer.toString());
                } catch {
                    // optional: log a warning
                    responseJSON = null;
                }
            }

            this.logger.logResponse(actualStatus);
            this.statusCodeValidator(actualStatus, statusCode, this.deleteRequest);
        });

        this.cleanupFields();
        return responseJSON;
    }

    private getUrl(): string {
        const url = new URL(`${this.baseUrl ?? this.defaultBaseUrl}${this.apiPath}`);
        for (const [key, value] of Object.entries(this.queryParams)) {
            url.searchParams.append(key, value);
        }
        return url.toString();
    }

    private statusCodeValidator(actualStatus: number, expectedStatus: number, callingMethod: Function): void {
        if (actualStatus !== expectedStatus) {
            const logs = this.logger.getRecentLogs();
            const error = new Error(`Expected status ${expectedStatus}, but got ${actualStatus}\n\nRecent API Activity: \n${logs}`);
            Error.captureStackTrace(error, callingMethod);
            throw error;
        }
    }

    private cleanupFields(): void {
        this.apiBody = {};
        this.apiHeaders = {};
        this.baseUrl = undefined;
        this.apiPath = '';
        this.queryParams = {};
    }
}

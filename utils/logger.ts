export class APILogger {
    private recentLogs: any[] = [];
    public logRequest(method: string, url: string, headers: Record<string, string>, body?: any): void {
        const logEntry = { method, url, headers, body };
        this.recentLogs.push({ type: 'Request Details', data: logEntry });
    }

    public logResponse(statusCode: number, body?: any): void {
        const logEntry = { statusCode, body };
        this.recentLogs.push({ type: 'Response Details', data: logEntry });
    }

    public getRecentLogs(): string {
        const logs = this.recentLogs
            .map((log) => {
                return `===${log.type}===\n${JSON.stringify(log.data, null, 4)}`;
            })
            .join('\n\n');
        return logs;
    }
}

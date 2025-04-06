export type Target = {
    id: string;
    name: string;
    url: string;
    checkInterval: number;
    lastStatus?: {
        online: boolean;
        statusCode: number | null;
        responseTime: number | null;
        checkedAt: string;
    };
}
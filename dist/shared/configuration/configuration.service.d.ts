export declare class ConfigurationService {
    private readonly logger;
    private currentEnv;
    constructor();
    get(key: string): string;
    get port(): string | number;
    get isDevelopment(): boolean;
    get mongoUri(): string;
    get JWT(): {
        Key: string;
        AccessTokenTtl: number;
        RefreshTokenTtl: number;
    };
}

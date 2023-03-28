export declare class ConfigurationService {
    private readonly logger;
    private currentEnv;
    constructor();
    get(key: string): string;
    get port(): string | number;
    get isDevelopment(): boolean;
    static get mongoUri(): string;
    static get JWT(): {
        Key: string;
        AccessTokenTtl: number;
        RefreshTokenTtl: number;
    };
}

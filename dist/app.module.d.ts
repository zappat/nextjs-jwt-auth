import { ConfigurationService } from './shared/configuration/configuration.service';
export declare class AppModule {
    private readonly _configService;
    static port: number | string;
    static isDev: boolean;
    constructor(_configService: ConfigurationService);
    private static normalizePort;
}

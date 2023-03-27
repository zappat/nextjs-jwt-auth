"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const shared_module_1 = require("./shared/shared.module");
const configuration_service_1 = require("./shared/configuration/configuration.service");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const product_module_1 = require("./product/product.module");
let AppModule = AppModule_1 = class AppModule {
    constructor(_configService) {
        this._configService = _configService;
        AppModule_1.port = AppModule_1.normalizePort(_configService.port);
        AppModule_1.isDev = _configService.isDevelopment;
    }
    static normalizePort(val) {
        const port = typeof val === 'string' ? parseInt(val, 10) : val;
        if (Number.isNaN(port)) {
            return val;
        }
        if (port >= 0) {
            return port;
        }
        throw new Error(`Port "${val}" is invalid.`);
    }
};
AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            shared_module_1.SharedModule,
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: async (configService) => ({
                    uri: configService.mongoUri,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                }),
                inject: [configuration_service_1.ConfigurationService],
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            product_module_1.ProductModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [configuration_service_1.ConfigurationService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
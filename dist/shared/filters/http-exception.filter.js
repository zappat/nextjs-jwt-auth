"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(error, host) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        if (error.getStatus() === common_1.HttpStatus.UNAUTHORIZED) {
            if (typeof error.response !== 'string') {
                error.response.message =
                    error.response.message ||
                        'You do not have permission to access this resource';
            }
        }
        if (Array.isArray(error.response.message) &&
            error.response.message.length > 0 &&
            error.response.message[0].constraints) {
            const errorsList = error.response.message.map((e) => {
                return { field: e.property, errors: e.constraints };
            });
            error.response.errors = errorsList;
            error.response.message = 'Validation error occured';
        }
        res.status(error.getStatus()).json({
            error: {
                statusCode: error.getStatus(),
                error: error.response.name || error.response.error || error.name,
                message: error.response.message || error.response || error.message,
                errors: error.response.errors || null,
                timestamp: new Date().toISOString(),
                path: req ? req.url : null,
            },
        });
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map
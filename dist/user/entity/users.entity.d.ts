import { ModelType } from 'typegoose';
import { BaseModel } from '../../shared/base.model';
export declare class User extends BaseModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    static get model(): ModelType<User>;
    static get modelName(): string;
}
export declare const ClientModel: ModelType<User>;

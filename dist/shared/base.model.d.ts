import { SchemaOptions } from 'mongoose';
import { Typegoose } from 'typegoose';
export declare class BaseModel extends Typegoose {
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const schemaOptions: SchemaOptions;

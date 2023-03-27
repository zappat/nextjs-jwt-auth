import { prop, ModelType } from 'typegoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';

export class Product extends BaseModel {
  @prop({
    required: [true, 'Name is required'],
  })
    name: string;

  @prop({
    required: [true, 'Description is required'],
  })
  description: string;

  static get model(): ModelType<Product> {
    return new Product().getModelForClass(Product, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}

export const ClientModel = Product.model;

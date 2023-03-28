import { prop, ModelType } from 'typegoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';

export class ProductCategory extends BaseModel {
  @prop({
    required: [true, 'Name is required'],
  })
  name: string;

  @prop({
    required: [true, 'Description is required'],
  })
  description: string;

  static get model(): ModelType<ProductCategory> {
    return new ProductCategory().getModelForClass(ProductCategory, {
      schemaOptions,
    });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}

export const ClientModel = ProductCategory.model;

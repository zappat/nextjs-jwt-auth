import { prop, ModelType } from 'typegoose';
import { BaseEntity, schemaOptions } from '../../shared/base.entity';

export class ProductCategory extends BaseEntity {
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

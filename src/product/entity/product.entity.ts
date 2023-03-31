import { prop, ModelType } from 'typegoose';
import { BaseEntity, schemaOptions } from '../../shared/base.entity';

export class Product extends BaseEntity {
  @prop({
    required: [true, 'Name is required'],
  })
  name: string;

  @prop({
    required: [true, 'Description is required'],
  })
  description: string;

  @prop({
    required: [true, 'Category is required'],
  })
  categoryId: string;

  @prop({
    required: [false, 'Product images'],
    default: [],
  })
  images: string[];

  static get model(): ModelType<Product> {
    return new Product().getModelForClass(Product, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}

export const ClientModel = Product.model;

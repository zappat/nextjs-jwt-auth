import { SchemaOptions } from 'mongoose';
import { Typegoose, prop, pre } from 'typegoose';

@pre<BaseModel>('update', function (next) {
  this.updatedAt = new Date(Date.now());
  next();
})
export class BaseModel extends Typegoose {
  @prop({ default: Date.now() })
  createdAt?: Date;

  @prop({ default: Date.now() })
  updatedAt?: Date;
}

export const schemaOptions: SchemaOptions = {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  timestamps: true,
};

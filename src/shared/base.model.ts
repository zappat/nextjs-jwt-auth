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
    versionKey: false,    
    virtuals: true,
    getters: true,
    transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;      
    },
  },
  timestamps: true,
};

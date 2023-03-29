import { Constants } from 'src/shared/utils/constants';
import { prop, ModelType } from 'typegoose';
import { BaseEntity, schemaOptions } from '../../shared/base.entity';

export class User extends BaseEntity {
  @prop({
    required: [true, 'First name is required'],
  })
  firstName: string;

  @prop({
    required: [true, 'Last name is required'],
  })
  lastName: string;

  @prop({
    required: [true, 'Email is required'],
    unique: true,
    match: Constants.EmailRegex,
  })
  email: string;

  @prop({
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  })
  password: string;

  static get model(): ModelType<User> {
    return new User().getModelForClass(User, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}

export const ClientModel = User.model;

import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'First name is required',
  })
  firstName: string;

  @IsNotEmpty({
    message: 'Last name is required',
  })
  lastName: string;

  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsString({
    message: 'Email must be a string',
  })
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}

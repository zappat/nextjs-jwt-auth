import {
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    example: 'Otto Molina',
    description: 'The name of the user',
    minLength: 2,
    maxLength: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  readonly firstName: string;

  @ApiProperty({
    example: 'Otto Molina',
    description: 'The name of the user',
    minLength: 2,
    maxLength: 100,
    required: true,
  })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  readonly lastName: string;

  @ApiProperty({
    example: 'otto.molina@gmail.com',
    description: 'The email of the User',
    format: 'email',
    maxLength: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '12345678',
    description: 'The password of the user with at least 8 characters',
    minLength: 8,
    maxLength: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 100)
  readonly password: string;
}

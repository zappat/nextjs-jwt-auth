import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsArray,
  IsOptional,
} from 'class-validator';

export class ProductDto {
  @ApiProperty({
    example: 'Coriander Leaves',
    description: 'This is name of product',
    required: true,
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  @IsString()
  @Length(2, 100)
  readonly name: string;

  @ApiProperty({
    example: 'Coriander Leaves Description',
    description: 'This is name of product description',
    required: true,
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: 'Coriander',
    description: 'This is name of product category',
    required: true,
  })
  @IsString()
  readonly categoryId: string;

  @IsArray()
  @IsOptional()
  @Type(() => String)
  readonly images: string[];
}

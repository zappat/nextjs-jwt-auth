import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ProductCategoryDto {
  @ApiProperty({
    example: 'Coriander',
    description: 'This is name of product category',
    required: true,
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  @IsString()
  @Length(2, 100)
  readonly name: string;

  @ApiProperty({
    example: 'Coriander Description',
    description: 'This is name of product category description',
    required: true,
  })
  @IsString()
  readonly description: string;
}

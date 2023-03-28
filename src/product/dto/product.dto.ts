import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

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
}

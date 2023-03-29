import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ProductImageDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsMongoId()
  productId: string;
}

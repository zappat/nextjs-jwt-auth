import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({
    message: 'Name is required',
  })
        name: string;

  @IsNotEmpty({
    message: 'Product Description is required',
  })
  description: string;
}

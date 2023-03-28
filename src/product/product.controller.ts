import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ProductCategoryDto } from './dto/product.category.dto';
import { ProductDto } from './dto/product.dto';
import { ProductCategory } from './entity/product.category.entity';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All product' })
  @ApiOkResponse({})
  async getAllProduct() {
    return await this.productService.getAllProduct();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create one product' })
  @ApiCreatedResponse({})
  async createProduct(@Body() productDto: ProductDto): Promise<Product> {
    return await this.productService.createProduct(productDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('allCatagories')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All product category' })
  @ApiOkResponse({})
  async getAllProductCategory() {
    return await this.productService.getAllProductCategory();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create-category')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create one product Category' })
  @ApiCreatedResponse({})
  async createProductCategory(
    @Body() productCategoryDto: ProductCategoryDto,
  ): Promise<ProductCategory> {
    return await this.productService.createProductCategory(productCategoryDto);
  }
}

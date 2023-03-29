import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UploadedFiles,
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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProductImageDto } from './dto/product.image.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { ProductCategoryDto } from './dto/product.category.dto';
import { ProductDto } from './dto/product.dto';
import { ProductCategory } from './entity/product.category.entity';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import { multerOptions } from './../shared/multer.middleware';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get('all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All product' })
  @ApiOkResponse({})
  async getAllProduct() {
    return await this.productService.getAllProduct();
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create one product' })
  @ApiCreatedResponse({})
  async createProduct(@Body() productDto: ProductDto): Promise<Product> {
    return await this.productService.createProduct(productDto);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get('allCatagories')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All product category' })
  @ApiOkResponse({})
  async getAllProductCategory() {
    return await this.productService.getAllProductCategory();
  }

  // @UseInterceptors(ClassSerializerInterceptor)
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

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'avatars', maxCount: 10 }], multerOptions),
  )
  async upload(
    @Body() productImageDto: ProductImageDto,
    @UploadedFiles() avatars: Array<Express.Multer.File>,
  ) {
    if (!avatars || !avatars.length) {
      throw new HttpException('No files uploaded', HttpStatus.BAD_REQUEST);
    }

    await this.productService.uploadAvatar(productImageDto, avatars);
    return {
      message: `${avatars.length} files uploaded successfully`,
      data: null,
    };
  }
}

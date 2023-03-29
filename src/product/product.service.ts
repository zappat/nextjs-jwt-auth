import { ProductImageDto } from './dto/product.image.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductCategoryDto } from './dto/product.category.dto';
import { ProductDto } from './dto/product.dto';
import { ProductCategory } from './entity/product.category.entity';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('ProductCategory')
    private readonly productCategoryModel: Model<ProductCategory>,
  ) {}

  async createProduct(productDto: ProductDto): Promise<Product> {
    const product = new this.productModel(productDto);
    await product.save();

    return product;
  }

  async getAllProduct(): Promise<any> {
    const products = await this.productModel.find({}).lean();
    return products.map((product) => {
      return {
        ...product,
        images: product.images.map(
          (image) =>
            `http://localhost:${process.env.PORT}/products/images/${image}`,
        ),
      };
    });
  }

  async createProductCategory(
    productCategoryDto: ProductCategoryDto,
  ): Promise<ProductCategory> {
    const productCategory = new this.productCategoryModel(productCategoryDto);
    await productCategory.save();

    return productCategory;
  }

  async getAllProductCategory(): Promise<any> {
    return await this.productCategoryModel.find({}).lean();
  }

  public async uploadProduct(
    productImageDto: ProductImageDto,
    avatars: any,
  ): Promise<void> {
    const images = avatars.avatars.map((avatar) => avatar.filename);
    await this.productModel.updateOne(
      { _id: productImageDto.productId }, // Need to verify this productId is valid or not
      { $push: { images: { $each: images } } },
    );
  }
}

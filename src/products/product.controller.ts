import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product as ProductModel } from '@prisma/client';

import { Prisma } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('/all')
  async getAllProducts(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 16,
    @Query('order') order: string = 'ASC',
    @Query('category') category: string,
  ) {
    return this.productService.getAllProducts(page, pageSize);
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.getProduct(Number(id));
  }

  @Get('/category/:categoryId')
  async getProductByCategory(@Param('categoryId') categoryId: string): Promise<ProductModel[]> {
    return this.productService.getProductByCategory(Number(categoryId));
  }

  @Post('/create')
  async createProduct(@Body() productData: Prisma.ProductCreateInput): Promise<ProductModel> {
    return this.productService.createProduct(productData);
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productData: ProductModel,
  ): Promise<ProductModel> {
    return this.productService.updateProduct({ productId: Number(id), data: productData });
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.deleteProduct(Number(id));
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: { category: true }, // Include category relation
    });
  }

  async getProduct(productId: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id: productId },
      include: { category: true }, // Include category relation
    });
  }

  async getProductByCategory(categoryId: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { category_id: categoryId},
  
    });
  }
  
  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async updateProduct(params: { productId: number; data: Prisma.ProductUpdateInput}): Promise<Product> {
    const { productId, data } = params;
    return this.prisma.product.update({
      where: { id: productId },
      data,
    });
  }

  async deleteProduct(productId: number): Promise<Product> {
    return this.prisma.product.delete({ 
      where: { id: productId },
    });
  }
}

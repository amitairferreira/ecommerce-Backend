import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: { products: true }, // Include products relation
    });
  }

  async getCategory(categoryId: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id: categoryId },
      include: { products: true }, // Include products relation
    });
  }

  async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ 
      data,
    });
  }

  async updateCategory(params: { categoryId: number; data: Prisma.CategoryUpdateInput}): Promise<Category> {
    const { categoryId, data } = params;
    return this.prisma.category.update({
      where: { id: categoryId },
      data,
    });
  }

  async deleteCategory(categoryId: number): Promise<Category> {
    return this.prisma.category.delete({ 
      where: { id: categoryId }, 
    });
  }
}

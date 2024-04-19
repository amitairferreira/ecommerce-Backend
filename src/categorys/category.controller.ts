import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category as CategoryModel } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get('/:id')
  async getCategoryById(@Param('id') id: string): Promise<CategoryModel> {
    return this.categoryService.getCategory(Number(id));
  }

  // @Post('category')
  // async createCategory(@Body() categoryData: CategoryModel): Promise<CategoryModel> {
  //   return this.categoryService.createCategory(categoryData);
  // }

  // @Put('category/:id')
  // async updateCategory(
  //   @Param('id') id: string,
  //   @Body() categoryData: CategoryModel,
  // ): Promise<CategoryModel> {
  //   return this.categoryService.updateCategory({ categoryId: Number(id), data: categoryData });
  // }

  // @Delete('category/:id')
  // async deleteCategory(@Param('id') id: string): Promise<CategoryModel> {
  //   return this.categoryService.deleteCategory(Number(id));
  // }
}


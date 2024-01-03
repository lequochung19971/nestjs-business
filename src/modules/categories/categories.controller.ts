import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Csrf } from 'src/decorators/csrf.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryParamsDto } from './dto/category-query-params.dto';

@Controller('categories')
@ApiTags('categories')
@UseGuards(JwtGuard)
@Csrf()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({
    summary: 'Create category',
  })
  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @ApiOperation({
    summary: 'Query categories',
  })
  @Get()
  getCategories(@Query() queryParams: CategoryQueryParamsDto) {
    return this.categoriesService.getCategories(queryParams);
  }

  @ApiOperation({
    summary: 'Get category by id',
  })
  @Get(':id')
  getCategory(@Param('id') id: string) {
    return this.categoriesService.getCategory(id);
  }

  @ApiOperation({
    summary: 'Update category partially',
  })
  @Patch(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @ApiOperation({
    summary: 'Delete category by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}

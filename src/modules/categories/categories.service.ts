import { Injectable } from '@nestjs/common';
import { toQueryResponseDto } from 'src/utils/toDtoArray';
import { DataSource } from 'typeorm';
import { classToClassFromExist, plainToClass } from 'class-transformer';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';
import { CategoriesQueryParamsDto } from './dto/categories-query-params.dto';
import { CategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';
import { CategoryNotFound } from './exceptions/category-not-found';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly dataSource: DataSource,
  ) {}

  createCategory(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create({
      title: createCategoryDto.title,
      description: createCategoryDto.description,
      parent: createCategoryDto.parentId
        ? {
            id: createCategoryDto.parentId,
          }
        : undefined,
    });
    return this.categoryRepository.save(category);
  }

  async getCategories(params: CategoriesQueryParamsDto) {
    let queryBuilder = this.categoryRepository.createQueryBuilder('category');

    if (params.search?.columns?.length && params.search?.value) {
      queryBuilder = queryBuilder.search(
        params.search.columns,
        params.search.value,
      );
    }

    let totalCount: number;
    if (params.includeTotalCount) {
      totalCount = await queryBuilder.getCount();
    }

    const categories = await queryBuilder
      .orderBy(params.orderColumn, params.order)
      .take(params.take)
      .skip(params.skip)
      .getMany();

    return toQueryResponseDto(CategoryDto, {
      entity: categories,
      meta: {
        page: params.page,
        take: params.take,
        totalCount,
      },
    });
  }

  async getCategory(id: string, includedChildren = true) {
    const categoryEntity = await this.categoryRepository.findOneBy({ id });

    if (!categoryEntity) {
      throw new CategoryNotFound();
    }

    if (includedChildren) {
      const descendantsTree =
        await this.categoryRepository.findDescendantsTree(categoryEntity);
      categoryEntity.children = descendantsTree.children;
    }

    const categoryDto = categoryEntity.toDto(CategoryDto);
    return categoryDto;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryEntity = await this.categoryRepository.findOneBy({
      id,
    });

    if (!categoryEntity) {
      throw new CategoryNotFound();
    }

    this.categoryRepository.merge(categoryEntity, {
      ...updateCategoryDto,
      parent: updateCategoryDto.parentId
        ? {
            id: updateCategoryDto.parentId,
          }
        : undefined,
    });

    return this.categoryRepository.save(categoryEntity);
  }

  async deleteCategory(id: string) {
    this.categoryRepository.softDelete(id);
  }
}

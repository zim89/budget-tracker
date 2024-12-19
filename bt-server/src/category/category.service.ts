import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import type { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    const isExist = await this.categoryRepository.findBy({
      name: dto.name,
    });

    if (isExist.length)
      throw new BadRequestException('This category already exist');

    const category = {
      name: dto.name,
      type: dto.type,
    };

    return await this.categoryRepository.save(category);
  }

  async findAll() {
    return await this.categoryRepository.find({
      where: {},
      relations: {
        transactions: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

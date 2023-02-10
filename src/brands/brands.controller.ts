import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

const controllerName = 'brands';

@ApiTags(controllerName)
@Controller(controllerName)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The brand was successfully created.',
    type: Brand,
  })
  create(@Body() { name }: CreateBrandDto) {
    return this.brandsService.create({ name });
  }

  @Get()
  @ApiOkResponse({
    type: [Brand],
  })
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: Brand,
  })
  @ApiNotFoundResponse({
    description: 'Brand not found',
  })
  async findOne(@Param('id') id: number) {
    const brand = await this.brandsService.findOne(id);

    if (!brand) {
      throw new NotFoundException('Brand not found.');
    }

    return brand;
  }

  @Patch(':id')
  @ApiOkResponse({
    type: Brand,
  })
  @ApiNotFoundResponse({
    description: 'Brand not found',
  })
  update(@Param('id') id: number, @Body() { name }: UpdateBrandDto) {
    return this.brandsService.update(id, { name });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Brand successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Brand not found',
  })
  remove(@Param('id') id: number) {
    return this.brandsService.remove(id);
  }
}

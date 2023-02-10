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
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
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
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: Brand,
  })
  @ApiNotFoundResponse({
    description: 'Brand not found',
  })
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Brand successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Brand not found',
  })
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const controllerName = 'products';

@ApiTags(controllerName)
@Controller(controllerName)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() { brand, name, price_range, seller }: CreateProductDto) {
    return this.productsService.create({
      name,
      price_range,
      brand: {
        connectOrCreate: {
          where: { name: brand },
          create: { name: brand },
        },
      },
      seller: {
        connectOrCreate: {
          where: { name: seller },
          create: { name: seller },
        },
      },
    });
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post('/search')
  find(@Body() { brand, name, price_range, seller }: SearchProductDto) {
    const searhFilter: Prisma.Enumerable<Prisma.ProductWhereInput> = [];

    if (brand) {
      searhFilter.push({ brand: { name: { contains: brand } } });
    }

    if (seller) {
      searhFilter.push({ seller: { name: { contains: seller } } });
    }

    if (name) {
      searhFilter.push({ name: { contains: name } });
    }

    if (price_range) {
      searhFilter.push({ price_range });
    }

    return this.productsService.find({
      where: {
        OR: searhFilter,
      },
      include: {
        brand: true,
        seller: true,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() { brand, description, name, price_range, seller }: UpdateProductDto,
  ) {
    const updateInput: Prisma.ProductUpdateInput = {};

    if (brand) {
      updateInput.brand = {
        connectOrCreate: {
          where: { name: brand },
          create: { name: brand },
        },
      };
    }

    if (seller) {
      updateInput.seller = {
        connectOrCreate: {
          where: { name: seller },
          create: { name: seller },
        },
      };
    }

    if (description) {
      updateInput.description = description;
    }

    if (name) {
      updateInput.name = name;
    }

    if (price_range) {
      updateInput.price_range = price_range;
    }

    return this.productsService.update(id, updateInput);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}

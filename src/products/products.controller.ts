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
  InternalServerErrorException,
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
    const searchFilter: Prisma.Enumerable<Prisma.ProductWhereInput> = [];

    if (brand) {
      searchFilter.push({ brand: { name: { contains: brand } } });
    }

    if (seller) {
      searchFilter.push({ seller: { name: { contains: seller } } });
    }

    if (name) {
      searchFilter.push({ name: { contains: name } });
    }

    if (price_range) {
      searchFilter.push({ price_range });
    }

    return this.productsService.find({
      where: {
        OR: searchFilter,
      },
      include: {
        brand: true,
        seller: true,
      },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const product = await this.productsService.findById(id);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    try {
      await this.productsService.remove(id);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException(err.meta?.cause);
        }
      }

      throw new InternalServerErrorException();
    }
  }
}

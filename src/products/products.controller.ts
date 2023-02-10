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
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

const controllerName = 'products';

@ApiTags(controllerName)
@Controller(controllerName)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The product was successfully created.',
    type: Product,
  })
  create(@Body() { brand, name, priceRange, seller }: CreateProductDto) {
    return this.productsService.create({
      name,
      priceRange,
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
  @ApiOkResponse({
    type: [Product],
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Post('/search')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [Product],
  })
  find(@Body() { brand, name, priceRange, seller }: SearchProductDto) {
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

    if (priceRange) {
      searchFilter.push({ priceRange });
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
  @ApiOkResponse({
    type: Product,
  })
  async findOne(@Param('id') id: number) {
    const product = await this.productsService.findById(id);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  @Patch(':id')
  @ApiOkResponse({
    type: Product,
  })
  update(
    @Param('id') id: number,
    @Body() { brand, description, name, priceRange, seller }: UpdateProductDto,
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

    if (priceRange) {
      updateInput.priceRange = priceRange;
    }

    return this.productsService.update(id, updateInput);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'The product was successfully deleted.',
  })
  async remove(@Param('id') id: number) {
    await this.productsService.remove(id);
  }
}

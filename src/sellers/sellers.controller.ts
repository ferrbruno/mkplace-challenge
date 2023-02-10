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
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Seller } from './entities/seller.entity';

const controllerName = 'sellers';

@ApiTags(controllerName)
@Controller(controllerName)
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Seller created successfully',
    type: Seller,
  })
  create(@Body() { name }: CreateSellerDto) {
    return this.sellersService.create({ name });
  }

  @Get()
  @ApiOkResponse({
    type: [Seller],
  })
  findAll() {
    return this.sellersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: Seller,
  })
  findOne(@Param('id') id: number) {
    return this.sellersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: Seller,
  })
  update(@Param('id') id: number, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellersService.update(id, updateSellerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(@Param('id') id: number) {
    return this.sellersService.remove(id);
  }
}

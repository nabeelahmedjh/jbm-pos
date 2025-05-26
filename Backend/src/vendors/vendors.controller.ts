import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { ConfigService } from '@nestjs/config';

@Controller('vendors')
export class VendorsController {
  constructor(
    private readonly vendorsService: VendorsService,
    private readonly configService: ConfigService, 
  ) {}

  @Post()
  async create(@Body() createVendorDto: CreateVendorDto) {
    try {
      return await this.vendorsService.create(createVendorDto);
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message,
      }
    }
  }

  @Get()
  async findAll() {
    return await this.vendorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorsService.update(+id, updateVendorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorsService.remove(+id);
  }
}

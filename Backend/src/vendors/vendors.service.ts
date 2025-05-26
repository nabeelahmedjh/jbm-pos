import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VendorDocument } from './vendors.schema';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorsService {
  constructor(@InjectModel('Vendor') private readonly vendorModel: Model<VendorDocument>) {}
  async create(createVendorDto: CreateVendorDto) {
    const createdVendor = new this.vendorModel(createVendorDto);
    try {
      return (await createdVendor.save()).toObject();
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Vendor with this name already exists');
      }
      throw error; // Re-throw other errors
    }
  }

  async findAll() {
      const vendors = await this.vendorModel.find().exec()
      return vendors;
  }

  findOne(id: number) {
    return `This action returns a #${id} vendor`;
  }

  update(id: number, updateVendorDto: UpdateVendorDto) {
    return `This action updates a #${id} vendor`;
  }

  remove(id: number) {
    return `This action removes a #${id} vendor`;
  }
}

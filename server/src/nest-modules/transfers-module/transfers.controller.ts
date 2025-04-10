import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { TransferSequelizeRepository } from 'src/core/transfer/infra/db/sequelize/transfer.repository';

@Controller('transfers')
export class TransfersController {

  constructor(transferRepo: TransferSequelizeRepository) {}

  @Post()
  create(@Body() createTransferDto: CreateTransferDto) {
  }

  @Get()
  findAll() {
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransferDto: UpdateTransferDto) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}

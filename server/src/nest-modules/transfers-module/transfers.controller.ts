import { Controller, Post, Body, UseGuards, Res, Inject } from '@nestjs/common';
import {
  CreateTransferInput,
  CreateTransferUseCase,
} from 'src/core/transfer/application/create/create-transfer.use-case';
import { JwtAuthGuard } from '../jwt-module/jwt-auth.guard';
import { Response } from 'express';

@Controller('transfers')
export class TransfersController {
  @Inject(CreateTransferUseCase)
  private createTransferUseCase: CreateTransferUseCase;

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateTransferInput, @Res() res: Response) {
    await this.createTransferUseCase.execute(data);
    return res.sendStatus(204);
  }
}

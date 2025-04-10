import { Test, TestingModule } from '@nestjs/testing';
import { TransfersController } from './transfers.controller';
import { TransferSequelizeRepository } from 'src/core/transfer/infra/db/sequelize/transfer.repository';

describe('TransfersController', () => {
  let controller: TransfersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransfersController],
      providers: [TransferSequelizeRepository]
    }).compile();

    controller = module.get<TransfersController>(TransfersController);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  })


});

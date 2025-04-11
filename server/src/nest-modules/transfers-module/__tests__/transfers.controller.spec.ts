import { Test, TestingModule } from '@nestjs/testing';
import { TransfersController } from '../transfers.controller';
import { CreateTransferUseCase, CreateTransferInput } from 'src/core/transfer/application/create/create-transfer.use-case';
import { JwtAuthGuard } from '../../jwt-module/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

class MockJwtAuthGuard {
  canActivate(context: ExecutionContext): boolean {
    return true;
  }
}

const mockResponse = {
  sendStatus: jest.fn().mockReturnValue(204),
};

describe('TransfersController', () => {
  let controller: TransfersController;
  let createTransferUseCase: CreateTransferUseCase;

  const mockCreateTransferUseCase = {
    execute: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransfersController],
      providers: [
        {
          provide: CreateTransferUseCase,
          useValue: mockCreateTransferUseCase,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useClass(MockJwtAuthGuard)
      .compile();

    controller = module.get<TransfersController>(TransfersController);
    createTransferUseCase = module.get<CreateTransferUseCase>(CreateTransferUseCase);
  });

  describe('create', () => {
    test('should call CreateTransferUseCase.execute and return 204', async () => {
      const transferInput: CreateTransferInput = {
        fromId: 'some-from-uuid',
        toId: 'some-to-uuid',
        amount: 100,
      };

      const result = await controller.create(transferInput, mockResponse as any);

      expect(mockCreateTransferUseCase.execute).toHaveBeenCalledWith(transferInput);
      expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
      expect(result).toEqual(204);
    });
  });
});

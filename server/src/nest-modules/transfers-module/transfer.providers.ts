import { getModelToken } from '@nestjs/sequelize';
import { CreateTransferUseCase } from 'src/core/transfer/application/create/create-transfer.use-case';
import { ITransferRepository } from 'src/core/transfer/domain/transfer.repository';
import { TransferModel } from 'src/core/transfer/infra/db/sequelize/transfer.model';
import { TransferSequelizeRepository } from 'src/core/transfer/infra/db/sequelize/transfer.repository';
import { IUserRepository } from 'src/core/user/domain/user.repository';
import { UserModel } from 'src/core/user/infra/db/sequelize/user.model';
import { UserSequelizeRepository } from 'src/core/user/infra/db/sequelize/user.repository';


export const REPOSITORIES = {
  TRANSFER_REPOSITORY: {
    provide: 'TransferRepository',
    useExisting: TransferSequelizeRepository,
  },
  USER_REPOSITORY: {
    provide: 'UserRepository',
    useExisting: UserSequelizeRepository,
  },
  TRANSFER_REPOSITORY_SEQUELIZE_REPOSITORY: {
    provide: TransferSequelizeRepository,
    useFactory: (transferModel: typeof TransferModel) => {
      return new TransferSequelizeRepository(TransferModel);
    },
    inject: [getModelToken(TransferModel)],
  },
  USER_REPOSITORY_SEQUELIZE_REPOSITORY: {
    provide: UserSequelizeRepository,
    useFactory: (userModel: typeof UserModel) => {
      return new UserSequelizeRepository(UserModel);
    },
    inject: [getModelToken(UserModel)],
  }
};

export const USE_CASES = {
  CREATE_TRANSFER_USE_CASE: {
    provide: CreateTransferUseCase,
    useFactory: (TransferRepo: ITransferRepository, UserRepo: IUserRepository) => {
      return new CreateTransferUseCase(TransferRepo, UserRepo);
    },
    inject: [REPOSITORIES.TRANSFER_REPOSITORY.provide, REPOSITORIES.USER_REPOSITORY.provide],
  },
};

export const TRANSFER_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
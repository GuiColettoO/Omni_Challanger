import { getModelToken } from '@nestjs/sequelize';
import { CreateUserUseCase } from 'src/core/user/application/create/create-user.use-case';
import { GetAllUserUseCase } from 'src/core/user/application/get-all/get-all-user.use-case';
import { LoginUseCase } from 'src/core/user/application/login/login.use-case';
import { IUserRepository } from 'src/core/user/domain/user.repository';
import { UserModel } from 'src/core/user/infra/db/sequelize/user.model';
import { UserSequelizeRepository } from 'src/core/user/infra/db/sequelize/user.repository';


export const REPOSITORIES = {
  USER_REPOSITORY: {
    provide: 'UserRepository',
    useExisting: UserSequelizeRepository,
  },
  USER_REPOSITORY_SEQUELIZE_REPOSITORY: {
    provide: UserSequelizeRepository,
    useFactory: (userModel: typeof UserModel) => {
      return new UserSequelizeRepository(UserModel);
    },
    inject: [getModelToken(UserModel)],
  },
};

export const USE_CASES = {
  CREATE_USER_USE_CASE: {
    provide: CreateUserUseCase,
    useFactory: (UserRepo: IUserRepository) => {
      return new CreateUserUseCase(UserRepo);
    },
    inject: [REPOSITORIES.USER_REPOSITORY.provide],
  },
  GET_ALL_USER_USE_CASE: {
    provide: GetAllUserUseCase,
    useFactory: (UserRepo: IUserRepository) => {
      return new GetAllUserUseCase(UserRepo);
    },
    inject: [REPOSITORIES.USER_REPOSITORY.provide],
  },
  LOGIN_USER_USE_CASE: {
    provide: LoginUseCase,
    useFactory: (UserRepo: IUserRepository) => {
      return new LoginUseCase(UserRepo);
    },
    inject: [REPOSITORIES.USER_REPOSITORY.provide],
  },
};

export const USER_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
import { Sequelize } from "sequelize-typescript";
import { CreateUserUseCase } from "../../create/create-user.use-case";
import { LoginUseCase } from "../login.use-case";
import { UserModel } from "src/core/user/infra/db/sequelize/user.model";
import { TransferModel } from "src/core/transfer/infra/db/sequelize/transfer.model";
import { UserSequelizeRepository } from "src/core/user/infra/db/sequelize/user.repository";


describe('LoginUseCase Integration Tests', () => {
  let sequelize: Sequelize;
  let repository: UserSequelizeRepository;
  let createUserUseCase: CreateUserUseCase;
  let loginUseCase: LoginUseCase;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [UserModel, TransferModel],
      logging: false,
    });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });

    repository = new UserSequelizeRepository(UserModel);
    createUserUseCase = new CreateUserUseCase(repository);
    loginUseCase = new LoginUseCase(repository);
  });

  test('should login successfully and return a valid token', async () => {
    await createUserUseCase.execute({
      username: 'GuilhermeLogin',
      password: 'SenhaForte123',
      birthdate: '10/10/1990',
    });

    const response = await loginUseCase.execute({
      username: 'GuilhermeLogin',
      password: 'SenhaForte123',
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('expiresIn');
    expect(typeof response.token).toBe('string');
    expect(typeof response.expiresIn).toBe('string');

    const expirationDate = new Date(response.expiresIn);
    expect(expirationDate.getTime()).toBeGreaterThan(Date.now());
  });

  test('should throw error if password is incorrect', async () => {
    await createUserUseCase.execute({
      username: 'OutroUsuario',
      password: 'SenhaReal',
      birthdate: '01/01/2000',
    });

    await expect(
      loginUseCase.execute({
        username: 'OutroUsuario',
        password: 'SenhaErrada',
      })
    ).rejects.toThrowError('Password is incorrect');
  });
});

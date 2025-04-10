import { UserSequelizeRepository } from "src/core/user/infra/db/sequelize/user.repository";
import { CreateUserUseCase } from "../../create/create-user.use-case";
import { GetAllUserUseCase } from "../get-all-user.use-case";
import { Sequelize } from "sequelize-typescript";
import { TransferModel } from "src/core/transfer/infra/db/sequelize/transfer.model";
import { UserModel } from "src/core/user/infra/db/sequelize/user.model";


describe('GetAllUserUseCase Integration Tests', () => {
  let useCase: GetAllUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let repository: UserSequelizeRepository;
  let sequelize: Sequelize;

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
    useCase = new GetAllUserUseCase(repository);
  });

  test('should findAll user', async () => {
    await createUserUseCase.execute({
      username: 'Guilherme Candidato',
      password: 'GuilhermeCandidato',
      birthdate: '19/05/2000',
    });

    await createUserUseCase.execute({
      username: 'Gabriel Candidato',
      password: 'GabrielCandidato',
      birthdate: '19/05/2001',
    });

    let entities = await useCase.execute();

    expect(entities).toHaveLength(2);

    const usernames = entities.map((user) => user.username);
    expect(usernames).toContain('Guilherme Candidato');
    expect(usernames).toContain('Gabriel Candidato');
  });
});

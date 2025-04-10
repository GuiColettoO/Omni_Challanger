import { UserSequelizeRepository } from "src/core/user/infra/db/sequelize/user.repository";
import { CreateUserUseCase } from "../create-user.use-case";
import { Sequelize } from "sequelize-typescript";
import { UserModel } from "src/core/user/infra/db/sequelize/user.model";
import { TransferModel } from "src/core/transfer/infra/db/sequelize/transfer.model";
import { Uuid } from "src/core/@shared/domain/value-objects/uuid/uuid.vo";



describe('CreateUserUseCase Integration Tests', () => {
  let useCase: CreateUserUseCase;
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
    useCase = new CreateUserUseCase(
      repository,
    );
  });

  test('should create a user', async () => {
    let output = await useCase.execute({
      username: 'Guilherme Candidato',
      password: 'GuilhermeCandidato',
      birthdate: '19/05/2000',
    });
    let entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
      id: entity.user_id?.id,
    });

    output = await useCase.execute({
        username: 'Guilherme Candidato',
        password: 'GuilhermeCandidato',
        birthdate: '19/05/2000',
    });
    entity = await repository.findById(new Uuid(output.id));
    expect(output).toStrictEqual({
        id: entity.user_id?.id,
    });
  });
});

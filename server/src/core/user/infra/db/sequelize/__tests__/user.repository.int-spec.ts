import { Sequelize } from 'sequelize-typescript';
import { UserSequelizeRepository } from '../user.repository';
import { UserModel } from '../user.model';
import { TransferModel } from 'src/core/transfer/infra/db/sequelize/transfer.model';
import { User } from 'src/core/user/domain/user.entity';
import { Uuid } from 'src/core/@shared/domain/value-objects/uuid/uuid.vo';

describe('UserSequelizeRepository Integration Tests', () => {
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
  });

  test('should inserts a new entity', async () => {
    let user = new User({
      user_id: new Uuid('5490020a-e866-4229-9adc-aa44b83234c4'),
      username: 'Guilherme Candidato',
      password: 'GuilhermeCandidato',
      birthdate: '19/05/2000',
    });

    await repository.insert(user);
    let entity = await repository.findById(user.user_id!);
    expect(entity!.toJSON()).toStrictEqual(entity!.toJSON());
  });

  test('should finds a entity by id', async () => {
    let entityFound = await repository.findById(new Uuid());
    expect(entityFound).toBeNull();

    let entity = new User({
      user_id: new Uuid('5490020a-e866-4229-9adc-aa44b83234c4'),
      username: 'Guilherme Candidato',
      password: 'GuilhermeCandidato',
      birthdate: '19/05/2000',
    });

    await repository.insert(entity);

    entityFound = await repository.findById(entity.user_id!);
    expect(entity.toJSON()).toStrictEqual(entityFound!.toJSON());
  });

  test('should finds a entity by username', async () => {
    let entityFound = await repository.findByUsername(" ");
    expect(entityFound).toBeNull();

    let entity = new User({
      user_id: new Uuid('5490020a-e866-4229-9adc-aa44b83234c4'),
      username: 'Guilherme Candidato',
      password: 'GuilhermeCandidato',
      birthdate: '19/05/2000',
    });

    await repository.insert(entity);

    entityFound = await repository.findByUsername(entity.username);
    expect(entity.toJSON()).toStrictEqual(entityFound!.toJSON());
  });

  test('should return all users', async () => {
    let entity = new User({
      user_id: new Uuid('5490020a-e866-4229-9adc-aa44b83234c4'),
      username: 'Guilherme Candidato',
      password: 'GuilhermeCandidato',
      birthdate: '19/05/2000',
    });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });
});

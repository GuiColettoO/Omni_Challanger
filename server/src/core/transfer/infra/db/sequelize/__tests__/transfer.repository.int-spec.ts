import { Sequelize } from "sequelize-typescript";
import { TransferSequelizeRepository } from "../transfer.repository";
import { TransferModel } from "../transfer.model";
import { UserModel } from "@core/user/infra/db/sequelize/user.model";
import { Transfer } from "@core/transfer/domain/transfer.entity";
import { Uuid } from "@core/@shared/domain/value-objects/uuid/uuid.vo";


describe('TransferSequelizeRepository Integration Tests', () => {
  let repository: TransferSequelizeRepository;
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [TransferModel, UserModel],
      logging: false,
    });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });

    await UserModel.create({
      user_id: 'eb8263a6-caaf-4dbd-8a18-518ad7fa5d9b',
      username: 'Gabriel',
      password: 'Gabriel2024',
      birthdate: '19/05/2000',
      balance: '500',
      created_at: new Date(),
    });

    await UserModel.create({
      user_id: '9e29ea28-f1cd-4a0f-95e8-8493fd0e8876',
      username: 'Guilherme',
      password: 'Guilherme2024',
      birthdate: '19/05/2000',
      balance: '500',
      created_at: new Date(),
    });

    repository = new TransferSequelizeRepository(TransferModel);
  });

  test('should inserts a new entity', async () => {
    let user = new Transfer({
      transfer_id: new Uuid('5490020a-e866-4229-9adc-aa44b83234c4'),
      fromId: 'eb8263a6-caaf-4dbd-8a18-518ad7fa5d9b',
      toId: '9e29ea28-f1cd-4a0f-95e8-8493fd0e8876',
      amount: 200,
    });

    await repository.insert(user);
    let entity = await repository.findById(user.transfer_id);
    expect(entity.toJSON()).toStrictEqual(entity.toJSON());
  });

  test('should finds a entity by id', async () => {
    let entityFound = await repository.findById(new Uuid());
    expect(entityFound).toBeNull();

    let entity = new Transfer({
      transfer_id: new Uuid('5490020a-e866-4229-9adc-aa44b83234c4'),
      fromId: 'eb8263a6-caaf-4dbd-8a18-518ad7fa5d9b',
      toId: '9e29ea28-f1cd-4a0f-95e8-8493fd0e8876',
      amount: 200,
    });

    await repository.insert(entity);

    entityFound = await repository.findById(entity.transfer_id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  test('should return all users', async () => {
    let entity = new Transfer({
      transfer_id: new Uuid('5490020a-e866-4229-9adc-aa44b83234c4'),
      fromId: 'eb8263a6-caaf-4dbd-8a18-518ad7fa5d9b',
      toId: '9e29ea28-f1cd-4a0f-95e8-8493fd0e8876',
      amount: 200,
    });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });
});

import { DataType, Sequelize } from "sequelize-typescript";
import { TransferModel } from "../transfer.model";
import { UserModel } from "src/core/user/infra/db/sequelize/user.model";


describe('TransferModel Integration Tests', () => {
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
  });

  test('mapping props', () => {
    const attributesMap = TransferModel.getAttributes();
    const attributes = Object.keys(TransferModel.getAttributes());

    expect(attributes).toStrictEqual([
      'transfer_id',
      'fromId',
      'toId',
      'amount',
      'created_at',
    ]);

    const transferIdAttr = attributesMap.transfer_id;
    expect(transferIdAttr).toMatchObject({
      field: 'transfer_id',
      fieldName: 'transfer_id',
      primaryKey: true,
      type: DataType.UUID(),
    });

    const fromIdAttr = attributesMap.fromId;
    expect(fromIdAttr).toMatchObject({
      field: 'fromId',
      fieldName: 'fromId',
      type: expect.any(Object),
    });

    const toIdAttr = attributesMap.toId;
    expect(toIdAttr).toMatchObject({
      field: 'toId',
      fieldName: 'toId',
      type: expect.any(Object),
    });

    const amountAttr = attributesMap.amount;
    expect(amountAttr).toMatchObject({
      field: 'amount',
      fieldName: 'amount',
      allowNull: false,
      type: DataType.NUMBER(),
    });

    const createdAtAttr = attributesMap.created_at;
    expect(createdAtAttr).toMatchObject({
      field: 'created_at',
      fieldName: 'created_at',
      allowNull: false,
      type: DataType.DATE(3),
    });
  });

  test('create', async () => {
    const arrange = {
      transfer_id: 'a106544b-20e0-458f-8055-6a4e2ddc8965',
      fromId: 'eb8263a6-caaf-4dbd-8a18-518ad7fa5d9b',
      toId: '9e29ea28-f1cd-4a0f-95e8-8493fd0e8876',
      amount: 200,
      created_at: new Date(),
    };

    const transfer = await TransferModel.create(arrange);

    expect(transfer.toJSON()).toStrictEqual(arrange);
  });
});

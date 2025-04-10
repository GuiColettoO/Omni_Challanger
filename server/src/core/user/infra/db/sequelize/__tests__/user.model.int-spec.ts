import { DataType, Sequelize } from 'sequelize-typescript';
import { UserModel } from '../user.model';
import { TransferModel } from 'src/core/transfer/infra/db/sequelize/transfer.model';


describe('UserModel Integration Tests', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
   models: [
        UserModel,
        TransferModel
      ],
      logging: false,
    });

    await sequelize.sync({ force: true });
  });
  test('mapping props', () => {
    const attributesMap = UserModel.getAttributes();
    const attributes = Object.keys(UserModel.getAttributes());

    expect(attributes).toStrictEqual([
      'user_id',
      'username',
      'password',
      'birthdate',
      'balance',
      'created_at',
    ]);

    const userIdAttr = attributesMap.user_id;
    expect(userIdAttr).toMatchObject({
      field: 'user_id',
      fieldName: 'user_id',
      primaryKey: true,
      type: DataType.UUID(),
    });

    const usernameAttr = attributesMap.username;
    expect(usernameAttr).toMatchObject({
      field: 'username',
      fieldName: 'username',
      allowNull: false,
      type: DataType.STRING(100),
    });

    const passwordAttr = attributesMap.password;
    expect(passwordAttr).toMatchObject({
      field: 'password',
      fieldName: 'password',
      allowNull: false,
      type: DataType.STRING(100),
    });

    const birthdateAttr = attributesMap.birthdate;
    expect(birthdateAttr).toMatchObject({
      field: 'birthdate',
      fieldName: 'birthdate',
      allowNull: false,
      type: DataType.STRING(100),
    });

    const balanceAttr = attributesMap.balance;
    expect(balanceAttr).toMatchObject({
      field: 'balance',
      fieldName: 'balance',
      allowNull: false,
      type: DataType.STRING(100),
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
      user_id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      username: 'Guilherme Candidato',
      password: 'GuilhermeCandidato@123',
      birthdate: '19/05/2000',
      balance: "0",
      created_at: new Date(),
    };

    const user = await UserModel.create(arrange);

    expect(user.toJSON()).toStrictEqual(arrange);
  });
});

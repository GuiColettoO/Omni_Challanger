import { Sequelize } from "sequelize-typescript";
import { UserModel } from "../user.model";
import { UserModelMapper } from "../user.mapper";
import { TransferModel } from "src/core/transfer/infra/db/sequelize/transfer.model";
import { EntityValidationError } from "src/core/@shared/domain/validators/validation.error";
import { Uuid } from "src/core/@shared/domain/value-objects/uuid/uuid.vo";
import { User } from "src/core/user/domain/user.entity";


describe('UserModelMapper Integration Tests', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [UserModel, TransferModel],
      logging: false,
    });

    await sequelize.sync({ force: true });
  });

  test('should throws error when user is invalid', () => {
    const model = UserModel.build({
      user_id: '9366b7dc-2d71-4799-b91c-c64adb205104',
    });
    try {
      UserModelMapper.toEntity(model);
    } catch (e) {
      expect(e).toBeInstanceOf(EntityValidationError);
      expect((e as EntityValidationError).error).toMatchObject({
        username: ['username must be a string', 'username should not be empty'],
        password: ['password must be a string', 'password should not be empty'],
        birthdate: [
          'birthdate must be a string',
          'birthdate should not be empty',
        ],
      });
    }
  });

  test('should convert a user model to a user aggregate', () => {
    const date = new Date();

    const model = UserModel.build({
      user_id: '5490020a-e866-4229-9adc-aa44b83234c4',
      username: 'Guilherme Candidato',
      password: 'GuilhermeCandidato',
      birthdate: '19/05/2000',
      created_at: date,
    });

    const aggregate = UserModelMapper.toEntity(model);

    expect(aggregate.toJSON()).toStrictEqual(
      new User({
        user_id: new Uuid('5490020a-e866-4229-9adc-aa44b83234c4'),
        username: 'Guilherme Candidato',
        password: 'GuilhermeCandidato',
        birthdate: '19/05/2000',
        created_at: date,
      }).toJSON()
    );
  });

  test('should convert a user aggregate to a user model', () => {
    const created_at = new Date();
    const aggregate = new User({
      user_id: new Uuid('5490020a-e866-4229-9adc-aa44b83234c4'),
      username: 'Guilherme Candidato',
      password: 'GuilhermeCandidato@',
      birthdate: '19/05/2000',
      balance: "0",
      created_at,
    });

    const model = UserModelMapper.toModel(aggregate);

    expect(model.toJSON()).toStrictEqual({
      user_id: '5490020a-e866-4229-9adc-aa44b83234c4',
      username: 'Guilherme Candidato',
      password: 'GuilhermeCandidato@',
      birthdate: '19/05/2000',
      balance: "0",
      created_at,
    });
  });
});

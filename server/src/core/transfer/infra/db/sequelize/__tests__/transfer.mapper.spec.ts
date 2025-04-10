import { UserModel } from '@core/user/infra/db/sequelize/user.model';
import { Sequelize } from 'sequelize-typescript';
import { TransferModel } from '../transfer.model';
import { TransferModelMapper } from '../transfer.mapper';
import { EntityValidationError } from '@core/@shared/domain/validators/validation.error';
import { Transfer } from '@core/transfer/domain/transfer.entity';
import { Uuid } from '@core/@shared/domain/value-objects/uuid/uuid.vo';


describe('TransferModelMapper Integration Tests', () => {
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

  test('should throws error when transfer is invalid', () => {
    const model = TransferModel.build({
      transfer_id: '9366b7dc-2d71-4799-b91c-c64adb205104',
    });
    try {
      TransferModelMapper.toEntity(model);
    } catch (e) {
      expect(e).toBeInstanceOf(EntityValidationError);
      expect((e as EntityValidationError).error).toMatchObject({
        amount: [
          'amount must be a number conforming to the specified constraints',
          'amount should not be empty',
        ],
        fromId: ['fromId must be a string', 'fromId should not be empty'],
        toId: ['toId must be a string', 'toId should not be empty'],
      });
    }
  });

  test('should convert a transfer model to a transfer aggregate', () => {
    const date = new Date();

    const model = TransferModel.build({
      transfer_id: '5490020a-e866-4229-9adc-aa44b83234c4',
      fromId: 'eb8263a6-caaf-4dbd-8a18-518ad7fa5d9b',
      toId: '9e29ea28-f1cd-4a0f-95e8-8493fd0e8876',
      amount: 500,
      created_at: date,
    });

    const aggregate = TransferModelMapper.toEntity(model);

    expect(aggregate.toJSON()).toStrictEqual(
      new Transfer({
        transfer_id: new Uuid('5490020a-e866-4229-9adc-aa44b83234c4'),
        fromId: 'eb8263a6-caaf-4dbd-8a18-518ad7fa5d9b',
        toId: '9e29ea28-f1cd-4a0f-95e8-8493fd0e8876',
        amount: 500,
        created_at: date,
      }).toJSON()
    );
  });

  test('should convert a transfer aggregate to a transfer model', () => {
    const created_at = new Date();
    const aggregate = new Transfer({
      transfer_id: new Uuid('5490020a-e866-4229-9adc-aa44b83234c4'),
      fromId: 'eb8263a6-caaf-4dbd-8a18-518ad7fa5d9b',
      toId: '9e29ea28-f1cd-4a0f-95e8-8493fd0e8876',
      amount: 500,
      created_at,
    });

    const model = TransferModelMapper.toModel(aggregate);

    expect(model.toJSON()).toStrictEqual({
      transfer_id: '5490020a-e866-4229-9adc-aa44b83234c4',
      fromId: 'eb8263a6-caaf-4dbd-8a18-518ad7fa5d9b',
      toId: '9e29ea28-f1cd-4a0f-95e8-8493fd0e8876',
      amount: 500,
      created_at,
    });
  });
});

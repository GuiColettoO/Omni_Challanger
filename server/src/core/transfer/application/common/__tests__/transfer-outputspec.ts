import { Transfer } from "src/core/transfer/domain/transfer.entity";
import { TransferOutputMapper } from "../transfer-output";


describe('TransferOutputMapper Unit Tests', () => {
  test('should convert a transfer in output', () => {

    const entity = Transfer.create({
        fromId: 'eb8263a6-caaf-4dbd-8a18-518ad7fa5d9b',
        toId: '9e29ea28-f1cd-4a0f-95e8-8493fd0e8876',
        amount: 500,
    });
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = TransferOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.transfer_id.id,
      fromId: 'eb8263a6-caaf-4dbd-8a18-518ad7fa5d9b',
      toId: '9e29ea28-f1cd-4a0f-95e8-8493fd0e8876',
      amount: 500,
      created_at: entity.created_at,
    });
  });
});

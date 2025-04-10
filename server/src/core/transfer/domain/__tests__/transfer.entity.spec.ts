import { Uuid } from "src/core/@shared/domain/value-objects/uuid/uuid.vo";
import { Transfer } from "../transfer.entity";


describe('Transfer unit test', () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Transfer, 'validate');
  });

  describe('constructor', () => {
    test('should create a transfer with default values', () => {
      const transfer = new Transfer({
        fromId: '8ec089fe-318d-41f8-92c6-164a598b6718',
        toId: 'ff121e64-a744-4cfe-a56d-b9bbc424e58f',
        amount: 200,
      });
      expect(transfer.transfer_id).toBeInstanceOf(Uuid);
      expect(transfer.fromId).toBe('8ec089fe-318d-41f8-92c6-164a598b6718');
      expect(transfer.toId).toBe('ff121e64-a744-4cfe-a56d-b9bbc424e58f');
      expect(transfer.amount).toBe(200);
    });
  });

  describe('create command', () => {
    test('should create a transfer)', () => {
      const transfer = Transfer.create({
        fromId: '8ec089fe-318d-41f8-92c6-164a598b6718',
        toId: 'ff121e64-a744-4cfe-a56d-b9bbc424e58f',
        amount: 200,
      });
      expect(transfer.transfer_id).toBeInstanceOf(Uuid);
      expect(transfer.fromId).toBe('8ec089fe-318d-41f8-92c6-164a598b6718');
      expect(transfer.toId).toBe('ff121e64-a744-4cfe-a56d-b9bbc424e58f');
      expect(transfer.amount).toBe(200);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('transfer_id field', () => {
    const arrange = [
      { transfer_id: null },
      { transfer_id: undefined },
      { transfer_id: new Uuid() },
    ];

    test.each(arrange)('id = %j', ({ transfer_id }) => {
      const transfer = new Transfer({
        transfer_id: transfer_id as any,
        fromId: 'Guilherme Candidato',
        toId: 'GuilhermeCandidato',
        amount: 200,
      });

      expect(transfer.transfer_id).toBeInstanceOf(Uuid);
      if (transfer_id) {
        expect(transfer.transfer_id).toBe(transfer_id);
      }
    });
  });

  describe('Transfer Validator', () => {
    describe('create command', () => {
      test('should an invalid transfer with fromId, toId, amount and balance property', () => {
        expect(() =>
          Transfer.create({
            fromId: null as any,
            toId: null as any,
            amount: null as any,
          })
        ).containsErrorMessages({
          fromId: ['fromId must be a string', 'fromId should not be empty'],
          toId: ['toId must be a string', 'toId should not be empty'],
          amount: [
            'amount must be a number conforming to the specified constraints',
            'amount should not be empty',
          ],
        });

        expect(() =>
          Transfer.create({
            fromId: '',
            toId: '',
            amount: '' as any,
          })
        ).containsErrorMessages({
          fromId: ['fromId should not be empty'],
          toId: ['toId should not be empty'],
          amount: [
            'amount must be a number conforming to the specified constraints',
            'amount should not be empty',
          ],
        });

        expect(() =>
          Transfer.create({
            fromId: 5 as any,
            toId: 5 as any,
            amount: '' as any,
          })
        ).containsErrorMessages({
          fromId: ['fromId must be a string'],
          toId: ['toId must be a string'],
          amount: [
            'amount must be a number conforming to the specified constraints',
            'amount should not be empty',
          ],
        });
      });
    });
  });
});

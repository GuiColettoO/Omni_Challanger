import { Uuid } from 'src/core/@shared/domain/value-objects/uuid/uuid.vo';
import { User } from '../user.entity';

describe('User unit test', () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(User, 'validate');
  });

  describe('constructor', () => {
    test('should create a user with default values', () => {
      const user = new User({
        username: 'Guilherme Candidato',
        password: 'GuilhermeCandidato',
        birthdate: '19/05/2000',
      });
      expect(user.user_id).toBeInstanceOf(Uuid);
      expect(user.username).toBe('Guilherme Candidato');
      expect(user.password).toBe('GuilhermeCandidato');
      expect(user.birthdate).toBe('19/05/2000');
      expect(user.balance).toBe('0');
    });
  });

  describe('create command', () => {
    test('should create a user)', () => {
      const user = User.create({
        username: 'Guilherme Candidato',
        password: 'GuilhermeCandidato',
        birthdate: '19/05/2000',
      });
      expect(user.user_id).toBeInstanceOf(Uuid);
      expect(user.username).toBe('Guilherme Candidato');
      expect(user.password).toBe('GuilhermeCandidato');
      expect(user.birthdate).toBe('19/05/2000');
      expect(user.balance).toBe('0');
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('user_id field', () => {
    const arrange = [
      { user_id: null },
      { user_id: undefined },
      { user_id: new Uuid() },
    ];

    test.each(arrange)('id = %j', ({ user_id }) => {
      const user = new User({
        user_id: user_id as any,
        username: 'Guilherme Candidato',
        password: 'GuilhermeCandidato',
        birthdate: '19/05/2000',
      });

      expect(user.user_id).toBeInstanceOf(Uuid);
      if (user_id) {
        expect(user.user_id).toBe(user_id);
      }
    });
  });

  describe('User Validator', () => {
    describe('create command', () => {
      test('should an invalid user with username, password, birthdate and balance property', () => {

        expect(() =>
          User.create({
            username: null,
            password: null,
            birthdate: null,
            balance: null
          })
        ).containsErrorMessages({
          username: [
            'username must be a string',
            'username should not be empty',
          ],
          password: [
            'password must be a string',
            'password should not be empty',
          ],
          birthdate: [
            'birthdate must be a string',
            'birthdate should not be empty',
          ],
        });

        expect(() =>
          User.create({
            username: '',
            password: '',
            birthdate: '',
            balance: ''
          })
        ).containsErrorMessages({
          username: ['username should not be empty'],
          password: ['password should not be empty'],
          birthdate: ['birthdate should not be empty'],
        });

        expect(() =>
          User.create({
            username: 5 as any,
            password: 5 as any,
            birthdate: 5 as any,
            balance: 5 as any
          })
        ).containsErrorMessages({
          username: ['username must be a string'],
          password: ['password must be a string'],
          birthdate: ['birthdate must be a string'],
        });
      });
    });
  });
});

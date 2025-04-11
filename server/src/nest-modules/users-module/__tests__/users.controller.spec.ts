import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../../config-module/config.module';
import { DatabaseModule } from '../../database-module/database.module';
import { UsersController } from '../users.controller';
import { IUserRepository } from 'src/core/user/domain/user.repository';
import { UsersModule } from '../users.module';
import { USER_PROVIDERS } from '../users.providers';
import { Uuid } from 'src/core/@shared/domain/value-objects/uuid/uuid.vo';

describe('UsersController Integration Tests', () => {
  let controller: UsersController;
  let repository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        UsersModule,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    repository = module.get<IUserRepository>(
      USER_PROVIDERS.REPOSITORIES.USER_REPOSITORY.provide,
    );
  });

  describe('should create a user', () => {
    const testCases = [
      {
        send_data: {
          username: 'GuilhermeColetto',
          password: 'GuilhermeCandidato',
          birthdate: '19/05/2000'
        }
      },
      {
        send_data: {
          username: 'GabrielColetto',
          password: 'GabrielCandidato',
          birthdate: '19/05/2000'
        }
      }
    ];
  
    test.each(testCases)(
      'when body is %o',
      async ({ send_data }) => {
        const result = await controller.create(send_data);
        expect(result).toStrictEqual({ id: expect.any(String) });
  
        const entity = await repository.findById(new Uuid(result.id));
        expect(entity).toBeDefined();
      },
    );
  });
  
  describe('should log in a user', () => {
    const loginCases = [
      {
        send_data: {
          username: 'GuilhermeColetto',
          password: 'GuilhermeCandidato'
        }
      },
      {
        send_data: {
          username: 'GabrielColetto',
          password: 'GabrielCandidato'
        }
      }
    ];
  
    test.each(loginCases)(
      'when login input is %o',
      async ({ send_data }) => {
        await controller.create({
          ...send_data,
          birthdate: '19/05/2000',
        });
  
        const result = await controller.login(send_data);
  
        expect(result).toStrictEqual({
          token: expect.any(String),
          expiresIn: expect.any(String),
        });
      },
    );
  });
  
  describe('should get all users', () => {
  
    test('should return an empty array when no users are registered', async () => {
      const result = await controller.findAll();
      expect(result).toStrictEqual([]);
    });
  
    test('should return all registered users', async () => {
      const user1 = {
        username: 'GuilhermeColetto',
        password: 'GuilhermeCandidato',
        birthdate: '19/05/2000'
      };
  
      const user2 = {
        username: 'GabrielColetto',
        password: 'GabrielCandidato',
        birthdate: '19/05/2000'
      };
  
      const createResult1 = await controller.create(user1);
      const createResult2 = await controller.create(user2);
  
      const result = await controller.findAll();
  
      expect(result).toHaveLength(2);
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: createResult1.id,
          username: user1.username,
          birthdate: user1.birthdate,
        }),
        expect.objectContaining({
          id: createResult2.id,
          username: user2.username,
          birthdate: user2.birthdate,
        }),
      ]));
    });
  });
});

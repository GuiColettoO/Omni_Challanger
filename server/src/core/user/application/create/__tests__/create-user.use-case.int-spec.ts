import { UserSequelizeRepository } from "src/core/user/infra/db/sequelize/user.repository";
import { CreateUserUseCase } from "../create-user.use-case";
import { Sequelize } from "sequelize-typescript";
import { UserModel } from "src/core/user/infra/db/sequelize/user.model";
import { TransferModel } from "src/core/transfer/infra/db/sequelize/transfer.model";
import { Uuid } from "src/core/@shared/domain/value-objects/uuid/uuid.vo";
import { CreateTransferInput, CreateTransferUseCase } from "src/core/transfer/application/create/create-transfer.use-case";
import { TransferSequelizeRepository } from "src/core/transfer/infra/db/sequelize/transfer.repository";

describe('CreateTransferUseCase Integration Tests', () => {
  let useCase: CreateTransferUseCase;
  let repository: TransferSequelizeRepository;
  let userRepo: UserSequelizeRepository;
  let createUserUeCase: CreateUserUseCase;
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
      user_id: '5490020a-e866-4229-9adc-aa44b83234c4',
      username: 'Guilherme Candidato',
      password: 'GuilhermeCandidato',
      birthdate: '19/05/2000',
      balance: 200,
      created_at: new Date(),
    });

    await UserModel.create({
      user_id: '840f09d5-692c-48cc-b718-1c33dfa75bf3',
      username: 'Gabriel Candidato',
      password: 'GabrielCandidato',
      birthdate: '19/05/2000',
      balance: 500,
      created_at: new Date(),
    });

    repository = new TransferSequelizeRepository(TransferModel)
    userRepo = new UserSequelizeRepository(UserModel);

    useCase = new CreateTransferUseCase(repository, userRepo)

    createUserUeCase = new CreateUserUseCase(
      userRepo,
    );
  });

  test('should create a transfer and update balances correctly', async () => {
    const input: CreateTransferInput = {
      fromId: '5490020a-e866-4229-9adc-aa44b83234c4',
      toId: '840f09d5-692c-48cc-b718-1c33dfa75bf3',
      amount: 30,
    };

    await useCase.execute(input);

    const sender = await userRepo.findById(new Uuid(input.fromId));
    expect(sender?.balance).toEqual("170");

    const recipient = await userRepo.findById(new Uuid(input.toId));
    expect(recipient?.balance).toEqual("530");

    const transfers = await TransferModel.findAll();
    expect(transfers.length).toBe(1);
    const transfer = transfers[0];
    expect(transfer.fromId).toEqual(input.fromId);
    expect(transfer.toId).toEqual(input.toId);
    expect(Number(transfer.amount)).toEqual(input.amount);
  });
});

import { IUseCase } from "src/core/@shared/application/use-case.interface";
import { ITransferRepository } from "../../domain/transfer.repository";
import { IUserRepository } from "src/core/user/domain/user.repository";
import { Transfer } from "../../domain/transfer.entity";
import { Uuid } from "src/core/@shared/domain/value-objects/uuid/uuid.vo";

export class CreateTransferUseCase implements IUseCase<CreateTransferInput, void> {
  constructor(
    private readonly transferRepo: ITransferRepository,
    private readonly userRepo: IUserRepository, 
  ) {}

  async execute(input: CreateTransferInput): Promise<void> {
    
    const fromUser = await this.userRepo.findById(new Uuid(input.fromId));
    if (!fromUser) {
      throw new Error('Sender user not found');
    }

    const senderBalance = parseFloat(fromUser.balance);
    if (senderBalance < input.amount) {
      throw new Error(`Insufficient balance: available ${senderBalance}, required ${input.amount}`);
    }

    const toUser = await this.userRepo.findById(new Uuid(input.toId));
    if (!toUser) {
      throw new Error('Recipient user not found');
    }

    fromUser.balance = (senderBalance - input.amount).toString();
    await this.userRepo.update!(fromUser);

    const receiverBalance = parseFloat(toUser.balance);
    toUser.balance = (receiverBalance + input.amount).toString();
    await this.userRepo.update!(toUser);

    const entity = Transfer.create(input);
    await this.transferRepo.insert(entity);
  }
}

export type CreateTransferInput = {
  fromId: string,
  toId: string,
  amount: number,
};

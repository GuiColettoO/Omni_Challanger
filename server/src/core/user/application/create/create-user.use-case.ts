import { IUseCase } from "src/core/@shared/application/use-case.interface";
import { User } from "../../domain/user.entity";
import { IUserRepository } from "../../domain/user.repository";



export class CreateUserUseCase
  implements IUseCase<CreateUserInput, CreateUserOutput>
{
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const entity = User.create(input);

    await this.userRepo.insert(entity);
    
    return {id: entity.user_id!.id};
  }
}

export type CreateUserInput = {
  username: string;
  password: string;
  birthdate: string;
};

export type CreateUserOutput = {
  id: string;
};

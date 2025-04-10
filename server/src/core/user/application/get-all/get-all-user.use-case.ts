import { IUserRepository } from "../../domain/user.repository";
import { UserOutput, UserOutputMapper } from "../common/user-output";



export class GetAllUserUseCase
{
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(): Promise<GetAllUserOutput> {
    const userList =
      await this.userRepo.findAll();

    return userList.map((user) =>
      UserOutputMapper.toOutput(user)
    );
  }
}

export type GetAllUserOutput = UserOutput[];
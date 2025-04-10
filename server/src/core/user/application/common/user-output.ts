import { User } from "../../domain/user.entity";

export type UserOutput = {
  id: string;
  username: string,
  birthdate: string,
  balance: string,
  created_at?: Date;
};

export class UserOutputMapper {
  static toOutput(entity: User): UserOutput {
    const { user_id, ...otherProps } = entity.toJSON();
    return {
      id: entity.user_id!.id,
      ...otherProps,
    };
  }
}

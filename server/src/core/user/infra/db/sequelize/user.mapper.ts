import { User } from 'src/core/user/domain/user.entity';
import { UserModel } from './user.model';
import { Uuid } from 'src/core/@shared/domain/value-objects/uuid/uuid.vo';

export class UserModelMapper {
  static toModel(entity: User): UserModel {
    return UserModel.build({
      user_id: entity.user_id?.id,
      username: entity.username,
      password: entity.password,
      birthdate: entity.birthdate,
      balance: entity.balance,
      created_at: entity.created_at,
    });
  }

  static toEntity(model: UserModel): User {
    const user = new User({
      user_id: new Uuid(model.user_id),
      username: model.username,
      password: model.password,
      birthdate: model.birthdate,
      balance: model.balance,
      created_at: model.created_at,
    });

    User.validate(user);
    return user;
  }
}


import { IUserRepository } from 'src/core/user/domain/user.repository';
import { UserModelMapper } from './user.mapper';
import { UserModel } from './user.model';
import { User } from 'src/core/user/domain/user.entity';
import { Uuid } from 'src/core/@shared/domain/value-objects/uuid/uuid.vo';

export class UserSequelizeRepository implements IUserRepository {
  constructor(private userModel: typeof UserModel) {}

  async insert(entity: User): Promise<void> {
    const modelProps = UserModelMapper.toModel(entity);
    await this.userModel.create(modelProps.toJSON());
  }

  async findById(entity_id: Uuid): Promise<User | null> {
    const model = await this._get(entity_id.id);

    return model ? UserModelMapper.toEntity(model) : null;
  }

  async findAll(): Promise<User[]> {
    const models = await this.userModel.findAll();
    return models.map((model) => UserModelMapper.toEntity(model));
  }

  async findByUsername(username: string): Promise<User | null> {
    const model = await this.userModel.findOne({
      where: { username: username },
    });
    return model ? UserModelMapper.toEntity(model) : null;
  }

  getEntity(): new (...args: any[]) => User {
    return User;
  }

  private async _get(id: string) {
    return await this.userModel.findOne({
      where: {
        user_id: id,
      },
    });
  }
}

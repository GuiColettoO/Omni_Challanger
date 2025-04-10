
import { IRepository } from 'src/core/@shared/domain/repository/repository.interface';
import { User } from './user.entity';
import { Uuid } from 'src/core/@shared/domain/value-objects/uuid/uuid.vo';


export interface IUserRepository extends IRepository<User, Uuid> {
    findByUsername(username: string): Promise<User | null>;
}

import { Uuid } from 'src/core/@shared/domain/value-objects/uuid/uuid.vo';
import { Entity } from '../../@shared/domain/entity/entity';
import { UserValidatorFactory } from './user.validate';
import { Transfer } from 'src/core/transfer/domain/transfer.entity';
import { EntityValidationError } from 'src/core/@shared/domain/validators/validation.error';

type UserConstructorProps = {
  user_id?: Uuid;
  username: string;
  password: string;
  birthdate: string;
  balance?: string;
  created_at?: Date;
};

type UserCreateCommon = {
  username: string;
  password: string;
  birthdate: string;
  balance?: string;
  created_at?: Date;
};

export class User extends Entity {
  user_id?: Uuid;
  username: string;
  password: string;
  birthdate: string;
  balance: string;
  created_at?: Date;

  transfers: Transfer[] = [];

  constructor(props: UserConstructorProps) {
    super();
    this.user_id = props.user_id ?? new Uuid();
    this.username = props.username;
    this.password = props.password;
    this.birthdate = props.birthdate;
    this.balance = props.balance ?? '0';
    this.created_at = props.created_at ?? new Date();
  }

  static create(props: UserCreateCommon): User {
    const user = new User(props);
    User.validate(user);
    return user;
  }

  static validate(entity: User) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(entity);
    if (!isValid) {
      throw new EntityValidationError(validator.errors ?? {});
    }
  }

  addTransfer(transfer: Transfer) {
    this.transfers.push(transfer);
  }

  get entity_id(): Uuid {
    return this.user_id!;
  }

  toJSON() {
    return {
      user_id: this.user_id,
      username: this.username,
      password: this.password,
      birthdate: this.birthdate,
      balance: this.balance,
      created_at: this.created_at,
    };
  }
}

import { IsNotEmpty, IsString } from "class-validator";
import { User } from "./user.entity";
import { ClassValidatorFields } from "src/core/@shared/domain/validators/class-validator-fields";


export class UserRules {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  birthdate: string;

  @IsNotEmpty()
  @IsString()
  balance: string;

  constructor({ username, password, birthdate, balance }: User) {
    Object.assign(this, {
      username,
      password,
      birthdate,
      balance
    });
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(entity: User) {
    return super.validate(new UserRules(entity));
  }
}

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}

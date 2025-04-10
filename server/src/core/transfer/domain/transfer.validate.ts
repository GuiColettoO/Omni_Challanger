import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transfer } from "./transfer.entity";
import { ClassValidatorFields } from "src/core/@shared/domain/validators/class-validator-fields";


export class TransferRules {
  @IsNotEmpty()
  @IsString()
  fromId: string;

  @IsNotEmpty()
  @IsString()
  toId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  constructor({ fromId, toId, amount }: Transfer) {
    Object.assign(this, {
      fromId,
      toId,
      amount,
    });
  }
}

export class TransferValidator extends ClassValidatorFields<TransferRules> {
  validate(entity: Transfer) {
    return super.validate(new TransferRules(entity));
  }
}

export class TransferValidatorFactory {
  static create() {
    return new TransferValidator();
  }
}

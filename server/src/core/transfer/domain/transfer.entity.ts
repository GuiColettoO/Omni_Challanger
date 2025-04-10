import { Entity } from "src/core/@shared/domain/entity/entity";
import { TransferValidatorFactory } from "./transfer.validate";
import { Uuid } from "src/core/@shared/domain/value-objects/uuid/uuid.vo";
import { EntityValidationError } from "src/core/@shared/domain/validators/validation.error";


type TransferConstructorProps = {
  transfer_id?: Uuid;
  fromId: string;
  toId: string;
  amount: number;
  created_at?: Date;
};

type TransferCommonProps = {
  fromId: string;
  toId: string;
  amount: number;
};

export class Transfer extends Entity {
  transfer_id: Uuid;
  fromId: string;
  toId: string;
  amount: number;
  created_at: Date;

  constructor(props: TransferConstructorProps) {
    super();
    this.transfer_id = props.transfer_id ?? new Uuid();
    this.fromId = props.fromId;
    this.toId = props.toId;
    this.amount = props.amount;
    this.created_at = props.created_at ?? new Date();
  }

  static create(props: TransferCommonProps) {
    const transfer = new Transfer(props);
    Transfer.validate(transfer);
    return transfer;
  }

  static validate(entity: Transfer) {
    const validator = TransferValidatorFactory.create();
    const isValid = validator.validate(entity);
    if (!isValid) {
      throw new EntityValidationError(validator.errors ?? {});

    }
  }

  get entity_id(): Uuid {
    return this.transfer_id;
  }
  toJSON() {
    return {
      transfer_id: this.transfer_id,
      fromId: this.fromId,
      toId: this.toId,
      amount: this.amount,
      created_at: this.created_at
    };
  }
}

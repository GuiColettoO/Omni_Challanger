import { Transfer } from "../../domain/transfer.entity";

export type TransferOutput = {
  id: string;
  fromId: string,
  toId: string,
  amount: number,
  created_at: Date;
};

export class TransferOutputMapper {
  static toOutput(entity: Transfer): TransferOutput {
    const { transfer_id, ...otherProps } = entity.toJSON();
    return {
      id: entity.transfer_id.id,
      ...otherProps,
    };
  }
}

import { Transfer } from "src/core/transfer/domain/transfer.entity";
import { TransferModel } from "./transfer.model";
import { Uuid } from "src/core/@shared/domain/value-objects/uuid/uuid.vo";


export class TransferModelMapper {
  static toModel(entity: Transfer): TransferModel {
    return TransferModel.build({
      transfer_id: entity.transfer_id.id,
      fromId: entity.fromId,
      toId: entity.toId,
      amount: entity.amount,
      created_at: entity.created_at,
    });
  }

  static toEntity(model: TransferModel): Transfer {
    const transfer = new Transfer({
      transfer_id: new Uuid(model.transfer_id),
      fromId: model.fromId,
      toId: model.toId,
      amount: model.amount,
      created_at: model.created_at,
    });

    Transfer.validate(transfer);
    return transfer;
  }
}

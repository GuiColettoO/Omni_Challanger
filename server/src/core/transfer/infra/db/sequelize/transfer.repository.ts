import { TransferModel } from "./transfer.model";
import { TransferModelMapper } from "./transfer.mapper";
import { ITransferRepository } from "src/core/transfer/domain/transfer.repository";
import { Transfer } from "src/core/transfer/domain/transfer.entity";
import { Uuid } from "src/core/@shared/domain/value-objects/uuid/uuid.vo";


export class TransferSequelizeRepository implements ITransferRepository {
  constructor(private transferModel: typeof TransferModel) {}

  async insert(entity: Transfer): Promise<void> {
    const modelProps = TransferModelMapper.toModel(entity);
    await this.transferModel.create(modelProps.toJSON());
  }

  async findById(entity_id: Uuid): Promise<Transfer | null> {
    const model = await this._get(entity_id.id);

    return model ? TransferModelMapper.toEntity(model) : null;
  }

  async findAll(): Promise<Transfer[]> {
    const models = await this.transferModel.findAll();
    return models.map((model) => TransferModelMapper.toEntity(model));
  }

  getEntity(): new (...args: any[]) => Transfer {
    return Transfer;
  }

  private async _get(id: string) {
    return await this.transferModel.findOne({
      where: {
        transfer_id: id,
      },
    });
  }
}

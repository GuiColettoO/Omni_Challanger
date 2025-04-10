import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UserModel } from "../../../../user/infra/db/sequelize/user.model";


@Table({ tableName: 'transfers', timestamps: false })
export class TransferModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare transfer_id: string;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false, type: DataType.UUID })
  declare fromId: string;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false, type: DataType.UUID })
  declare toId: string;

  @Column({ allowNull: false, type: DataType.DECIMAL })
  declare amount: number;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare created_at: Date;

  @BelongsTo(() => {
    const { UserModel } = require("../../../../user/infra/db/sequelize/user.model");
    return UserModel;
  }, 'fromId')
  declare fromUser: UserModel;

  @BelongsTo(() => {
    const { UserModel } = require("../../../../user/infra/db/sequelize/user.model");
    return UserModel;
  }, 'toId')
  declare toUser: UserModel;
}
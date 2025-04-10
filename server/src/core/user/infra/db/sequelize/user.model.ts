import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { TransferModel } from "src/core/transfer/infra/db/sequelize/transfer.model";

@Table({ tableName: 'users', timestamps: false })
export class UserModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare user_id: string;

  @Column({ allowNull: false, type: DataType.STRING(100) })
  declare username: string;

  @Column({ allowNull: false, type: DataType.STRING(100) })
  declare password: string;

  @Column({ allowNull: false, type: DataType.STRING(100) })
  declare birthdate: string;

  @Column({ allowNull: false, type: DataType.STRING(100) })
  declare balance: string;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare created_at: Date;

  @HasMany(() => {
    const { TransferModel } = require("../../../../transfer/infra/db/sequelize/transfer.model");
    return TransferModel;
  })
  declare transfers: TransferModel[];

}
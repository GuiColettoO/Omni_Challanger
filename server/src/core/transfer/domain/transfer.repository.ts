import { Uuid } from "src/core/@shared/domain/value-objects/uuid/uuid.vo";
import { Transfer } from "./transfer.entity";
import { IRepository } from "src/core/@shared/domain/repository/repository.interface";



export interface ITransferRepository extends IRepository<Transfer, Uuid> {}

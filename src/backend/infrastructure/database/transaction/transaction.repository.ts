import { type EntityTarget } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { BaseRepository } from '../provider/base.repository';
import { InjectInitializeDatabaseOnAllProps } from '../provider/inject-db';

@InjectInitializeDatabaseOnAllProps
export class TransactionRepository extends BaseRepository<TransactionEntity> {
  static readonly repository = new TransactionRepository();
  static getRepository(): TransactionRepository {
    return TransactionRepository.repository;
  }
  constructor(target: EntityTarget<TransactionEntity> = TransactionEntity) {
    super(target);
  }
}

import { type EntityTarget } from 'typeorm';
import { StatusEntity } from './status.entity';
import { BaseRepository } from '../provider/base.repository';
import { InjectInitializeDatabaseOnAllProps } from '../provider/inject-db';

@InjectInitializeDatabaseOnAllProps
export class StatusRepository extends BaseRepository<StatusEntity> {
  static readonly repository = new StatusRepository();
  static getRepository(): StatusRepository {
    return StatusRepository.repository;
  }
  constructor(target: EntityTarget<StatusEntity> = StatusEntity) {
    super(target);
  }
}

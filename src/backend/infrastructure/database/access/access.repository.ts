import { type EntityTarget } from 'typeorm';
import { AccessEntity } from './access.entity';
import { BaseRepository } from '../provider/base.repository';
import { InjectInitializeDatabaseOnAllProps } from '../provider/inject-db';

@InjectInitializeDatabaseOnAllProps
export class AccessRepository extends BaseRepository<AccessEntity> {
  static readonly repository = new AccessRepository();
  static getRepository(): AccessRepository {
    return AccessRepository.repository;
  }
  constructor(target: EntityTarget<AccessEntity> = AccessEntity) {
    super(target);
  }
}

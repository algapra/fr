import { type EntityTarget } from 'typeorm';
import { DepartmentEntity } from './department.entity';
import { BaseRepository } from '../provider/base.repository';
import { InjectInitializeDatabaseOnAllProps } from '../provider/inject-db';

@InjectInitializeDatabaseOnAllProps
export class DepartmentRepository extends BaseRepository<DepartmentEntity> {
  static readonly repository = new DepartmentRepository();
  static getRepository(): DepartmentRepository {
    return DepartmentRepository.repository;
  }
  constructor(target: EntityTarget<DepartmentEntity> = DepartmentEntity) {
    super(target);
  }
}

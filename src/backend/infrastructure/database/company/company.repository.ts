import { type EntityTarget } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { BaseRepository } from '../provider/base.repository';
import { InjectInitializeDatabaseOnAllProps } from '../provider/inject-db';

@InjectInitializeDatabaseOnAllProps
export class CompanyRepository extends BaseRepository<CompanyEntity> {
  static readonly repository = new CompanyRepository();
  static getRepository(): CompanyRepository {
    return CompanyRepository.repository;
  }
  constructor(target: EntityTarget<CompanyEntity> = CompanyEntity) {
    super(target);
  }
}

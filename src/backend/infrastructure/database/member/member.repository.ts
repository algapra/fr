import { type EntityTarget } from 'typeorm';
import { MemberEntity } from './member.entity';
import { BaseRepository } from '../provider/base.repository';
import { InjectInitializeDatabaseOnAllProps } from '../provider/inject-db';

@InjectInitializeDatabaseOnAllProps
export class MemberRepository extends BaseRepository<MemberEntity> {
  static readonly repository = new MemberRepository();
  static getRepository(): MemberRepository {
    return MemberRepository.repository;
  }
  constructor(target: EntityTarget<MemberEntity> = MemberEntity) {
    super(target);
  }
}

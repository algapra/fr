import { type EntityTarget } from 'typeorm';
import { AttendanceEntity } from './attendance.entity';
import { BaseRepository } from '../provider/base.repository';
import { InjectInitializeDatabaseOnAllProps } from '../provider/inject-db';

@InjectInitializeDatabaseOnAllProps
export class AttendanceRepository extends BaseRepository<AttendanceEntity> {
  static readonly repository = new AttendanceRepository();
  static getRepository(): AttendanceRepository {
    return AttendanceRepository.repository;
  }
  constructor(target: EntityTarget<AttendanceEntity> = AttendanceEntity) {
    super(target);
  }
}

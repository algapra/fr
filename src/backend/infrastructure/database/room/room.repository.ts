import { type EntityTarget } from 'typeorm';
import { RoomEntity } from './room.entity';
import { BaseRepository } from '../provider/base.repository';
import { InjectInitializeDatabaseOnAllProps } from '../provider/inject-db';

@InjectInitializeDatabaseOnAllProps
export class RoomRepository extends BaseRepository<RoomEntity> {
  static readonly repository = new RoomRepository();
  static getRepository(): RoomRepository {
    return RoomRepository.repository;
  }
  constructor(target: EntityTarget<RoomEntity> = RoomEntity) {
    super(target);
  }
}

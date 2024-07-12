import { DataSourceOptions } from 'typeorm';
import { config } from '@/config';
import { UserEntity } from '../user/user.entity';
import { DepartmentEntity } from '../department/department.entity';
import { RoomEntity } from '../room/room.entity';
import { AccessEntity } from '../access/access.entity';
import { join, resolve } from 'path';
import { MemberEntity } from '../member/member.entity';
import { AttendanceEntity } from '../attendance/attendance.entity';
import { StatusEntity } from '../status/status.entity';
import { CompanyEntity } from '../company/company.entity';
import { TransactionEntity } from '../transaction/transaction.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: config.db.type as any,
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  entities: [
    UserEntity,
    DepartmentEntity,
    RoomEntity,
    AccessEntity,
    MemberEntity,
    AttendanceEntity,
    StatusEntity,
    CompanyEntity,
    TransactionEntity,
  ],
  migrations: [resolve(join(__dirname, 'migrations/*.{ts,js}'))],
  synchronize: false,
  logger: 'simple-console',
  poolSize: config.db.maxPoolConnection as number,
  charset: 'utf8mb4',
};

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { AttendanceEntity } from '../attendance/attendance.entity';
import { StatusEntity } from '../status/status.entity';
import { CompanyEntity } from '../company/company.entity';

@Entity({ name: 'members' })
export class MemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  avatar?: string;

  @Column({ type: 'varchar', length: 255 })
  fullName!: string;

  @Column({ type: 'varchar', length: 255 })
  nik!: string;

  @Column({ type: 'varchar', length: 255 })
  role!: string;

  @ManyToOne(() => CompanyEntity, (company) => company.member)
  company!: Relation<CompanyEntity>;

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.member)
  attendances!: AttendanceEntity[];

  @OneToMany(() => StatusEntity, (statuses) => statuses.member)
  statuses!: StatusEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', select: true })
  deletedAt?: Date;
}

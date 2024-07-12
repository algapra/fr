import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { MemberEntity } from '../member/member.entity';

@Entity({ name: 'statuses' })
export class StatusEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => MemberEntity, (member) => member.statuses)
  member!: Relation<MemberEntity>;

  @Column({ type: 'varchar', length: 255 })
  type!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}

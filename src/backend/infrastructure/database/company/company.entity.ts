import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { TransactionEntity } from '../transaction/transaction.entity';
import { MemberEntity } from '../member/member.entity';

@Entity({ name: 'companies' })
export class CompanyEntity {
  constructor(partial: Partial<CompanyEntity>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany(() => UserEntity, user => user.company)
  user!: UserEntity[];

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Column({ type: 'varchar' })
  type?: string;

  @Column({ type: 'varchar' })
  field?: string;

  @Column({ type: 'integer', nullable: true })
  memberCount?: number;

  @Column({ type: 'varchar', nullable: true })
  plan?: string;

  @OneToMany(() => TransactionEntity, transaction => transaction.company)
  transactions?: TransactionEntity[];

  @OneToMany(() => MemberEntity, member => member.company)
  member?: MemberEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt?: Date;
}

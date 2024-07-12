import { Profile } from '@/src/backend/models/profile';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';

@Entity({ name: 'users' })
export class UserEntity<T = Profile> {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => CompanyEntity, company => company.user)
  @JoinColumn()
  company!: Relation<CompanyEntity>;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  username!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'timestamp', nullable: true })
  emailConfirmedAt?: Date;

  @Column({ type: 'varchar', length: 255, default: '' })
  confirmationToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  confirmationSentAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  recoveryToken!: string;

  @Column({ type: 'timestamp', nullable: true })
  recoverySentAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastSignInAt?: Date;

  @Column({ type: 'text', default: '{}' })
  rawUserMetadata?: T;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Column({ type: 'varchar', default: 'company_owner' })
  role!: string;

  @Column({ type: 'timestamp', nullable: true })
  phoneConfirmedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt?: Date;
}

import { type PaymentGatewayData } from '@/src/backend/models/payment-gateway';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';

export enum TransactionStatus {
  DECLINED = 'declined',
  PENDING = 'pending',
  SUCCESS = 'success',
  EXPIRED = 'expired',
}

export enum PaymentGateway {
  MIDTRANS = 'Midtrans',
}

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  invoice!: string;

  @Column({ type: 'text', nullable: true })
  item!: string;

  @Column({ type: 'bigint', default: 0 })
  amount!: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: 'pending',
  })
  status!: TransactionStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  signature?: string;

  @ManyToOne(() => CompanyEntity, company => company.transactions)
  @JoinColumn()
  company!: Relation<CompanyEntity>;

  @Column({ type: 'varchar', length: 255, nullable: true })
  voucherCode?: string;

  @Column({ type: 'text', nullable: true })
  voucher?: string;

  @Column({ type: 'tinyint', default: 0 })
  processed!: number;

  @Column({ type: 'varchar', length: 255, nullable: true, default: 'midtrans' })
  paymentGateway?: PaymentGateway;

  @Column({ type: 'text', default: '{}' })
  paymentGatewayData!: PaymentGatewayData;

  @Column({ type: 'varchar', length: 25, default: '' })
  paymentMethod!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}

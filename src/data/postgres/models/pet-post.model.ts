import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';

export enum PetsPostStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class PetsPost extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  pet_name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_url: string;

  @Column({ type: 'enum', enum: PetsPostStatus, default: 'pending' })
  status: PetsPostStatus;

  @Column({ type: 'varchar', length: 255 })
  owner: string;

  @Column({ type: 'boolean', default: false })
  hasFound: boolean;

  @CreateDateColumn()
  created_at: Date;
}

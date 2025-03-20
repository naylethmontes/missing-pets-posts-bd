import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export enum PetsPostStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class PetsPost extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 50,
    nullable: false,
    unique: true,
  })
  pet_name: string;

  @Column('text', {
    nullable: false,
  })
  description: string;

  @Column('varchar', {
    length: 255,
    nullable: true,
  })
  image_url: string;

  @Column('enum', {
    enum: PetsPostStatus,
    default: PetsPostStatus.PENDING,
  })
  status: PetsPostStatus;

  @Column('varchar', {
    length: 255,
  })
  owner: string;

  @Column('boolean', {
    default: true,
    nullable: false,
  })
  hasFound: boolean;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;
}

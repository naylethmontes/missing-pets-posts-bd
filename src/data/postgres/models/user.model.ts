import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column('enum', {
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  rol: UserRole;

  @Column('boolean', {
    default: false,
    nullable: false,
  })
  status: boolean;

  @CreateDateColumn()
  created_at: Date;
}

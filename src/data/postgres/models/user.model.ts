import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 50,
    nullable: false,
  })
  name: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column('varchar', {
    length: 255,
    nullable: true,
  })
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

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('session')
export class SessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @CreateDateColumn({ type: 'timestamp' })
  login_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  logout_at: Date;

  @Column()
  access_token: string;
}

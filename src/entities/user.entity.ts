import { MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column()
  address: string;

  @Column()
  @MaxLength(10, {
    message: 'Mobile phone must be no more than 10 characters long',
  })
  phone_number: string;
}

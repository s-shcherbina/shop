import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  phone: string;

  @Column({ defaultValue: '' })
  email: string;

  @Column({ defaultValue: '' })
  password: string;
}

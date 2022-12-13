import { DataTypes, Optional } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import BaseModel from './base';
export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  salt: string;
  last_login: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserInput = Optional<UserAttributes, 'id'>;
export type UserOutput = Required<UserAttributes>;

export class User
  extends BaseModel<UserAttributes, UserInput>
  implements UserAttributes
{
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare salt: string;
  declare last_login: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export default (sequelize: Sequelize): typeof User => {
  User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_login: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      modelName: 'user',
      freezeTableName: true,
      timestamps: true,
      underscored: true
    }
  );
  return User;
};

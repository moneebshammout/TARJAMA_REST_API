'use strict';

import { Options } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import UserInit from './user';
import CategoryInit from './category';
import ExpenseInit from './expense';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const configDB = require('../config/config');

const env = process.env.NODE_ENV;
const config: Options = configDB[env as keyof typeof configDB];

/**
 * Initialize db connection
 */
const sequelize: Sequelize = new Sequelize(
  config.database ?? 'tempDB',
  config.username ?? 'postmoneeb',
  config.password ?? 'shammout123',
  config
);

/**
 * Models initializing
 */
const User = UserInit(sequelize);
const Category = CategoryInit(sequelize);
const Expense = ExpenseInit(sequelize);

/**
 * Models associations.
 */
User.hasMany(Category);
Category.belongsTo(User, {
  foreignKey: {
    name: 'userId'
  }
});

User.hasMany(Expense);
Expense.belongsTo(User, {
  foreignKey: {
    name: 'userId'
  }
});

Category.hasMany(Expense);
Expense.belongsTo(Category, {
  foreignKey: {
    name: 'categoryId'
  }
});

export { sequelize, Sequelize, User, Category, Expense };

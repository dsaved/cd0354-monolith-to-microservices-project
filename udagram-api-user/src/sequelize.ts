import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
    'username': process.env.ALX_POSTGRES_USERNAME,
    'password': process.env.ALX_POSTGRES_PASSWORD,
    'database': process.env.ALX_POSTGRES_DB,
    'host': process.env.ALX_POSTGRES_HOST,
    'dialect': 'postgres',
    'storage': ':memory:'
  });

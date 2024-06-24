import { DataSource } from 'typeorm';
import path from 'path';
import { Patient, PlatformFile } from './models';
import { env } from '../config';

export const DbSource = new DataSource({
  type: 'mysql',
  migrations: [path.resolve(__dirname, 'migrations/*{.js,.ts}')],
  synchronize: false,
  database: env.DB_DATABASE,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
  username: env.DB_USER,
  entities: [Patient, PlatformFile],
  host: env.DB_HOST
});

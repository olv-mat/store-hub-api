import 'dotenv/config';
import { DataSource } from 'typeorm';
import { StoreEntity } from './modules/store/entities/store.entity';
import { UserEntity } from './modules/user/entities/user.entity';

/* 
  npm run migration:generate -- src/migrations/...
  npm run migration:run
  npm run migration:revert
*/

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [StoreEntity, UserEntity],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
});

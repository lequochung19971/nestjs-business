import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { RefreshToken } from './modules/auth/entities/refresh-token.entity';
import { CategoriesModule } from './modules/categories/categories.module';
import { Category } from './modules/categories/entities/category.entity';
import { FilesModule } from './modules/files/files.module';
import { File } from './modules/files/entities/file.entity';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,

    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      entities: [User, RefreshToken, Category, File],
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      logging: true,
      ssl: true,
    }),

    UsersModule,
    AuthModule,
    CategoriesModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

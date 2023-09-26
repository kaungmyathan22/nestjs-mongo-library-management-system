import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_URL: joi.string().required(),
        PORT: joi.string().required(),
        JWT_SECRET: joi.string().required(),
        JWT_EXPIRES_IN: joi.number().required(),
        JWT_REFRESH_SECRET: joi.string().required(),
        JWT_REFRESH_EXPIRES_IN: joi.number().required(),
        REDIS_HOST: joi.string().required(),
        DUPLICATE_ERROR_KEY: joi.string().required(),
        USER_TOKEN_CACHE_KEY: joi.string().required(),
        COOKIE_JWT_KEY: joi.string().required(),
        COOKIE_REFRESH_JWT_KEY: joi.string().required(),
        REDIS_PORT: joi.number().required(),
      }),
    }),
    UsersModule,
    AuthenticationModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

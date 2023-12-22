import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CookieMiddleware } from './common/middlewares/cookie.middleware';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { BookModule } from './features/book/book.module';
import { DatabaseModule } from './features/database/database.module';
import { UsersModule } from './features/users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_URL: joi.string().required(),
        PORT: joi.string().required(),
        REDIS_HOST: joi.string().required(),
        DUPLICATE_ERROR_KEY: joi.string().required(),
        USER_TOKEN_CACHE_KEY: joi.string().required(),
        REDIS_PORT: joi.number().required(),
        /* token */
        JWT_ACCESS_SECRET: joi.string().required(),
        JWT_ACCESS_EXPIRES_IN: joi.number().required(),
        JWT_REFRESH_SECRET: joi.string().required(),
        JWT_REFRESH_EXPIRES_IN: joi.number().required(),
        /* cookies */
        COOKIE_JWT_ACCESS_KEY: joi.string().required(),
        COOKIE_REFRESH_JWT_KEY: joi.string().required(),
      }),
    }),
    UsersModule,
    AuthenticationModule,
    DatabaseModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieMiddleware).forRoutes('*');
  }
}

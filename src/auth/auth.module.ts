// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard'; // ✅ добавляем импорт

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'superSecretKey', // лучше вынести в .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RolesGuard, // ✅ теперь TypeScript знает, что это за класс
  ],
  controllers: [AuthController],
})
export class AuthModule {}

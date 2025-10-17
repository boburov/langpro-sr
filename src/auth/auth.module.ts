import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './google.strartegy';
import { MailModule } from 'src/mail/mail.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailModule,
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // optional
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
})
export class AuthModule {}

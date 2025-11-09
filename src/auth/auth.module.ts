import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'jwt-secret-key', // replace with process.env.JWT_SECRET in production
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, AuthResolver]
})
export class AuthModule { }

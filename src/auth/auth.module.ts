import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: 'asjdifjasdifja84jq329fjq9dhf', // TODO: Generate a new secret and put in a environment variable
      signOptions: {expiresIn: '60s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

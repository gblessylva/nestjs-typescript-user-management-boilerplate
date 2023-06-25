import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/user/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from 'src/common/configurations/constants';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { HashService } from 'src/auth/hash.service';
import { LocalStrategy } from 'src/common/strategy/local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '60d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, HashService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/configurations/constants';
import { HashService } from 'src/auth/hash.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
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
  controllers: [UserController],
  providers: [
    UserService,
    HashService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
  ],
})
export class UserModule {}

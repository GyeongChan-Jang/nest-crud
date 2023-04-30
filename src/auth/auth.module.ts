import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { User } from './user.entity'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import * as config from 'config'

const jwtConfig = config.get('jwt')

@Module({
  imports: [
    // Passport 모듈 등록
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // Jwt 모듈 등록
    JwtModule.register({
      secret: process.env.JST_SECRET || jwtConfig.secret,
      signOptions: {
        // 토큰의 만료시간: 1시간
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

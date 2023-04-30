import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { UserRepository } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { ExtractJwt } from 'passport-jwt'
import * as config from 'config'
// JWT 검증할 때 사용하는 전략 파일
// request를 받으면 헤더에 있는 토큰 검증
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }
  async validate(payload) {
    const { username } = payload
    const user: User = await this.userRepository.findOneBy({ username })

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}

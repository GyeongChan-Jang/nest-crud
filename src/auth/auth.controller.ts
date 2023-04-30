import { AuthService } from './auth.service'
import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthCredentialsDto } from './auth-credential.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  createUser(
    // Dto에 있는 유효성 조건에 맞게 체크를 해주려면 ValidationPipe를 넣어줘야 함
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto)
  }

  @Post('/test')
  // AuthGuard를 사용하면 validate에서 return시켰던 user 객체를 request에서 받을 수 있음
  // 토큰에 대한 유효성 검사도 해줌
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req)
  }
}

import { AuthService } from './auth.service'
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthCredentialsDto } from './auth-credential.dto'

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
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto)
  }
}

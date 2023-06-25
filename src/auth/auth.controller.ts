import { AuthService } from './auth.service';
import { Controller, Request, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //   @UseGuards(AuthGuard('local'))
  @Post(`/login`)
  async login(@Request() req) {
    const { email, password } = req.body;
    // console.log(req)
    const isUser = await this.authService.validateUser(email, password);
    if (isUser == null) {
      return { error: { code: 404, message: 'no such user exists ' } };
    } else {
      return await this.authService.login(email);
    }
  }
}

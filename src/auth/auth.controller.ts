import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  HttpStatus,
  HttpCode,
  Req,
  Ip,
  Body,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { User } from './../user/entity/users.entity';
import { SignupDto } from './dto/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Signup User' })
  @ApiCreatedResponse({})
  async register(@Body() signupDto: SignupDto): Promise<User> {
    const { user, errMessage } = await this.authService.createUser(signupDto);

    if (errMessage) {
      throw new BadRequestException(errMessage);
    }

    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login User' })
  @ApiOkResponse({})
  async login(
    @Req() req: Request,
    @Ip() ip: string,
    @Body() loginDto: LoginDto,
  ): Promise<{ user: User; accessToken: string }> {
    const { user, accessToken, errMessage } = await this.authService.login(
      req,
      ip,
      loginDto,
    );

    if (errMessage) {
      throw new BadRequestException(errMessage);
    }

    return { user, accessToken };
  }
}

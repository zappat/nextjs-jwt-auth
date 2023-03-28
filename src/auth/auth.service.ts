import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { Request } from 'express';
import { SignupDto } from './dto/signup.dto';
import { JwtPayloadDto } from './jwt-payload.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async createUser(
    signupDto: SignupDto,
  ): Promise<{ user: User; errMessage: string }> {
    const existUser = await this.getUser({ email: signupDto.email });

    if (existUser) {
      return { user: null, errMessage: 'User already exist' };
    }

    const password = await this.hashPassword(signupDto.password);
    const createdUser = await this.userModel.create({
      ...signupDto,
      password,
    });
    const user = createdUser.toObject() as User;
    delete user.password;
    delete user['_id'];

    return {
      user: user,
      errMessage: '',
    };
  }

  public async login(
    req: Request,
    ip: string,
    loginDto: LoginDto,
  ): Promise<{ user: User | null; accessToken: string; errMessage: string }> {
    const user = await this.getUser({ email: loginDto.email });

    if (!user) {
      return { user: null, accessToken: '', errMessage: 'No user was found' };
    }

    const isMatchPassword = await this.checkPassword(
      loginDto.password,
      user.password,
    );

    if (!isMatchPassword) {
      return { user: null, accessToken: '', errMessage: 'Invalid credentials' };
    }

    const accessToken = await this.createAccessToken(user, req, ip);
    delete user.password;
    delete user['_id'];

    return { user, accessToken, errMessage: '' };
  }

  private async getUser(predicate: Record<string, unknown>): Promise<User> {
    return this.userModel.findOne(predicate).lean();
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  private async checkPassword(
    reqPassword: string,
    password: string,
  ): Promise<boolean> {
    return bcrypt.compare(reqPassword, password);
  }

  private async createAccessToken(
    user: any,
    req: Request,
    ip: string,
  ): Promise<string> {
    const payload: JwtPayloadDto = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      ip: ip.replace('::ffff:', ''),
      userAgent: req.headers['user-agent'],
    };
    return this.jwtService.signAsync(payload);
  }
}

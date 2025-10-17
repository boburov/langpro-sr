import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AdminAccessGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.header('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }
    const token = authHeader.split(' ')[1];
    try {
      const user_data = this.jwt.verify(token);
      if (user_data.access !== true) {
        throw new HttpException('invalid access token', 408);
      }
      return true;
    } catch (error) {
      throw new HttpException('Authentication required', 408);
    }
  }
}

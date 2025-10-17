import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Oddiy autentifikatsiya (aslida JWT token tekshiriladi)
    const token = request.headers.authorization;
    
    if (!token) {
      throw new UnauthorizedException('Token talab qilinadi!');
    }

    // Token bor deb faraz qilamiz va user ni topamiz
    // Aslida bu yerda JWT ni tekshirish kerak
    const user = this.findUserByToken(token);
    
    if (!user) {
      throw new UnauthorizedException('Yaroqsiz token!');
    }

    // Userni request ga qo'shamiz
    request.user = user;
    
    return true;
  }

  // Oddiy user topish funksiyasi
  private findUserByToken(token: string): any {
    // Bu faqat misol. Aslida database dan tekshirish kerak
    const users = [
      { id: 1, name: 'Admin', role: 'admin', token: 'admin-token' },
      { id: 2, name: 'User', role: 'user', token: 'user-token' }
    ];

    return users.find(user => user.token === token);
  }
}
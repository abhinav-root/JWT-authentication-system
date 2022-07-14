import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExistingUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const user = await this.usersService.findUserByEmail(req.body.email);
    if (user) {
      throw new ConflictException('email already registered');
    }
    next();
  }
}

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import UserEntity from './entities/user.entity';

const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest();
    return new UserEntity(request.user);
  },
);

export default User;

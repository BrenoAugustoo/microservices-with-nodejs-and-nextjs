import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlArgumentsHost } from '@nestjs/graphql'

export interface AuthUser {
  sub: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthUser => {
    const ctx = GqlArgumentsHost.create(context);
    const req = ctx.getContext().req;

    console.log(req.user)

    return req.user;
  }
)
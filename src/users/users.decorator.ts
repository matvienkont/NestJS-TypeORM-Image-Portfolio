
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import cfg from 'src/config';

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (req.user) {
        return data ? req.user[data] : req.user;
    }

    const token = req.headers?.authorization ? (req.headers.authorization as string).split(' ') : null;
    if (token?.[1]) {
        try {
            const decoded: any = verify(token[1], cfg.jwtSecret);
            return data ? decoded[data] : decoded.user;
        } catch (err) {
            throw new UnauthorizedException({ message: 'JWT Token expired' });
        }
    }
});
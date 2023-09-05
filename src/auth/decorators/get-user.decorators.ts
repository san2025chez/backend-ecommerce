import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common"

export const GetUser = createParamDecorator(
    (data, ctx: ExecutionContext) => {
     
        if (data==='email') {
     
            
            const req= ctx.switchToHttp().getRequest();

            const userEmail = req.user.email;
            return userEmail;
        }
        
        const req= ctx.switchToHttp().getRequest();
        const user = req.user;

        if(!user)
        throw new InternalServerErrorException('Use not NotFoundError( request)')
        return user;
    }
)
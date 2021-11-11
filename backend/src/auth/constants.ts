import { PassportModule } from "@nestjs/passport";

export const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

export const jwtConstants = {
    secret: 'secretKey',
    signOptions: {
        expiresIn: 18000,
    },
};
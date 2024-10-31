import { Injectable, UnauthorizedException, Request, UseGuards, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async signIn(email: string, pass: string): Promise<any> {
        // TODO: Store the password using bcrypt
        const user = await this.usersService.findOneByEmail(email);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const payload = {sub: user.userId, username: user.email}

        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

}

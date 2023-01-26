import { Injectable } from "@nestjs/common";
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthProvider } from './auth-hashing.provider';
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/users/users.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser({ email, password }: LoginUserDto) {
        const user = await this.usersService.findOneByEmail(email);
        if (user) {
            const isPasswordMatch = await AuthProvider.comparePasswords(password, user.password);
            return isPasswordMatch ? user : undefined;
        }
        return undefined;
    }

    async login(user: UserEntity) {
        const payload = { email: user.email, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async logout(user: UserEntity) {
        const payload = { email: user.email, id: user.id };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '0s' }),
        };
    }
}

//     async validateUser(email: string, pass: string): Promise<any> {
//         const user = await this.usersService.findOne(email);
//         if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
//             const { password, ...result } = user;
//             return result;
//         }
//         return undefined;
//     }

//     async registration(createUserDto: CreateUserDto): Promise<UserEntity> {
//         let user: UserEntity;

//         try {

//           user = await this._userService.createUser(
//             registrationDto,
//             authentication,
//             queryRunner
//           );

//         } catch (error) {

//           if (error?.code === PostgresErrorCode.UniqueViolation) {
//             throw new UserAlreadyExistException();
//           }

//           throw new InternalServerErrorException();
//         } finally {
//           await queryRunner.release();
//         }

//         return user;
//       }
// }
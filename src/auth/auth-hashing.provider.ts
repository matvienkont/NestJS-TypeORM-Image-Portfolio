import * as bcrypt from 'bcrypt';

export class AuthProvider {
    static async generateHash(password: string) {
        return bcrypt.hash(password, 10);
    }

    static async comparePasswords(inputPassword: string, hashedPassword: string) {
        return bcrypt.compare(inputPassword, hashedPassword)
    }
}
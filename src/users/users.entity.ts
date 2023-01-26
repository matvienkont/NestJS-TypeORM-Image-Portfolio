import { Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { Exclude } from 'class-transformer';
import { AuthProvider } from '../auth/auth-hashing.provider';
import { PortfolioEntity } from 'src/portfolios/portfolios.entity';

@Entity('users')
export class UserEntity extends CommonEntity {
    @Column({ nullable: false, unique: true })
    public email: string;

    @Column({ nullable: false })
    @Exclude()
    public password: string;

    @OneToMany(() => PortfolioEntity, portfolio => portfolio.user)
    portfolios: PortfolioEntity[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await AuthProvider.generateHash(this.password);
        this.email = this.email.toLowerCase();
    }
}

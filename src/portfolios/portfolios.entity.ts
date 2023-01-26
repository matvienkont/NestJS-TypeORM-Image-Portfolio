import { Entity, Column, BeforeInsert, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { Exclude } from 'class-transformer';
import { AuthProvider } from '../auth/auth-hashing.provider';
import { UserEntity } from '../users/users.entity';
import { ImageEntity } from 'src/images/images.entity';

@Entity('portfolios')
export class PortfolioEntity extends CommonEntity {
    @Column({ nullable: false, unique: true })
    public name: string;

    @Column()
    public description: string;

    @ManyToOne(() => UserEntity, user => user.portfolios)
    public user: UserEntity | number;

    @OneToMany(() => ImageEntity, image => image.portfolio)
    public images: ImageEntity[];
}
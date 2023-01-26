import { Entity, Column, BeforeInsert, ManyToOne } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { Exclude } from 'class-transformer';
import { AuthProvider } from '../auth/auth-hashing.provider';
import { PortfolioEntity } from 'src/portfolios/portfolios.entity';

@Entity('images')
export class ImageEntity extends CommonEntity {
    @Column({ nullable: false })
    public name: string;

    @Column()
    public description: string

    @Column({ nullable: false })
    public imageUrl: string

    @ManyToOne(() => PortfolioEntity, portfolio => portfolio.images)
    public portfolio: PortfolioEntity | number;
}

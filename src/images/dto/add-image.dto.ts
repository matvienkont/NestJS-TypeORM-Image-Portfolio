import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumberString, IsInt } from 'class-validator';

export class AddImageDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly imageUrl: string;

    @Type(() => Number)
    @IsInt()
    readonly portfolio: number;
}
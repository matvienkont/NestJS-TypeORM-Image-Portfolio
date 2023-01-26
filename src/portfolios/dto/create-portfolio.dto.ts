import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
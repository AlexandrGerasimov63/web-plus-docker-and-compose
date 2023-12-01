import { Min, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOffersDto {
  @Min(1)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  hidden: boolean;

  @IsNotEmpty()
  itemId: number;
}

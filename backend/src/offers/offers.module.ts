import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offers } from './entities/offers.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offers, User, Wish])],
  providers: [OffersService],
  controllers: [OffersController],
})
export class OffersModule {}

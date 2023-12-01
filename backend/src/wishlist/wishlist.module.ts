import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlist.service';
import { WishlistsController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entities';
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, User, Wish])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}

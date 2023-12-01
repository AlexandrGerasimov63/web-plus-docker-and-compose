import { Exclude } from 'class-transformer';
import { Offers } from 'src/offers/entities/offers.entity';
import { BaseEntity } from 'src/utils/baseEntity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlist/entities/wishlist.entities';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  avatar: string;

  @Exclude()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wish: Wish[];

  @OneToMany(() => Offers, (offer) => offer.user)
  offer: Offers[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlist: Wishlist[];
}

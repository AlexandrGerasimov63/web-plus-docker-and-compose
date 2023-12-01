import { Offers } from 'src/offers/entities/offers.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/utils/baseEntity';
import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Wish extends BaseEntity {
  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column({ type: 'decimal', scale: 2 })
  price: number;

  @Column({ type: 'decimal', scale: 2 })
  raised: number;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @Column()
  description: string;

  @OneToMany(() => Offers, (offer) => offer.item)
  offers: Offers[];

  @Column()
  copied: number;
}

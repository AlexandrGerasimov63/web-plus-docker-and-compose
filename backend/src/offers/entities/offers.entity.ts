import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/utils/baseEntity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Offers extends BaseEntity {
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.id)
  item: Wish;

  @Column()
  amount: number;

  @Column({ default: false })
  hidden: boolean;
}

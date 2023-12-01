import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/utils/baseEntity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Wishlist extends BaseEntity {
  @Column()
  name: string;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];
}

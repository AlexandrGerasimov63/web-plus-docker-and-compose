import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOffersDto } from './dto/create-offers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offers } from './entities/offers.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class OffersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Offers)
    private offersRepository: Repository<Offers>,
  ) {}

  offerIsLegit(user: User, wish: Wish, offer: CreateOffersDto) {
    if (!wish) throw new NotFoundException('Виш не найден.');
    if (wish.owner.id === user.id)
      throw new BadRequestException('Нельзя скинуться на собственный виш.');
    if (Number(wish.raised) + Number(offer.amount) > wish.price) {
      throw new BadRequestException('Сумма превышает стоимость виша.');
    }
    return true;
  }

  async create(userId, createOfferDto: CreateOffersDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const user = await queryRunner.manager.findOneBy(User, { id: userId });
    const wish = await queryRunner.manager.findOne(Wish, {
      where: { id: createOfferDto.itemId },
      relations: { owner: true },
    });
    if (this.offerIsLegit(user, wish, createOfferDto)) {
      const newOffer = new Wish();
      Object.assign(newOffer, { ...createOfferDto, user, item: wish });
      await queryRunner.startTransaction();
      try {
        await queryRunner.manager.save(Wish, {
          ...wish,
          raised: Number(wish.raised) + Number(createOfferDto.amount),
        });
        await queryRunner.manager.save(Offers, newOffer);
        await queryRunner.commitTransaction();
        return {};
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException('Внутренняя ошибка сервера.');
      } finally {
        await queryRunner.release();
      }
    }
  }

  findAllByUser(id: number) {
    return this.offersRepository.find({
      relations: ['user', 'item', 'item.owner'],
      where: {
        user: {
          id: id,
        },
      },
    });
  }

  findOne(id: number) {
    return this.offersRepository.findOne({
      relations: ['user', 'item', 'item.owner'],
      where: { id },
    });
  }
}

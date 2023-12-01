import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOffersDto } from './dto/create-offers.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async create(@Request() req, @Body() createOfferDto: CreateOffersDto) {
    return this.offersService.create(req.user.id, createOfferDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.offersService.findAllByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }
}

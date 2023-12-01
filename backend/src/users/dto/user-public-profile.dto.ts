import { UserProfileDto } from './user-profile.dto';
import { Exclude } from 'class-transformer';

export class UserPublicProfileDto extends UserProfileDto {
  @Exclude()
  email;
}

import { UserPublicDto } from './user-public.dto';

export class AuthResponseDto {
  token: string;
  refreshToken: string;
  user: UserPublicDto;
}

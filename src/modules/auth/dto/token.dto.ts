import { Type } from 'class-transformer';

export class TokenDto {
  @Type(() => Number)
  expiresIn: number;

  @Type(() => String)
  token: string;

  constructor(data: { expiresIn: number; token: string }) {
    this.expiresIn = data.expiresIn;
    this.token = data.token;
  }
}

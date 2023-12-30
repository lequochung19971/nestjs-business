import { Type } from 'class-transformer';
import { NumberField } from 'src/decorators/fields/number-field.decorator';
import { StringField } from 'src/decorators/fields/string-field.decorator';

export class TokenDto {
  @NumberField()
  expiresIn: number;

  @StringField()
  token: string;

  constructor(data: { expiresIn: number; token: string }) {
    this.expiresIn = data.expiresIn;
    this.token = data.token;
  }
}

import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class RefreshTokensRepository extends Repository<RefreshToken> {
  constructor(private dataSource: DataSource) {
    super(RefreshToken, dataSource.createEntityManager());
  }
}

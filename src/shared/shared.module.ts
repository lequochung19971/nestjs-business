import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VercelBlobService } from './services/vercel-blob.service';

const providers = [VercelBlobService];
@Global()
@Module({
  imports: [],
  controllers: [],
  exports: providers,
  providers: [ConfigService, ...providers],
})
export class SharedModule {}

import { Module } from '@nestjs/common';
import { ForwardService } from './forward.service';
import { ForwardController } from './forward.controller';

@Module({
  controllers: [ForwardController],
  providers: [ForwardService],
})
export class ForwardModule {}

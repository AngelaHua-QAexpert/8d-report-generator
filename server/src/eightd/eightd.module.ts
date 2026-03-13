import { Module } from '@nestjs/common'
import { EightDController } from './eightd.controller'
import { EightDService } from './eightd.service'

@Module({
  controllers: [EightDController],
  providers: [EightDService],
  exports: [EightDService]
})
export class EightDModule {}

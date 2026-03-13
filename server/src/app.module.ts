import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { EightDModule } from '@/eightd/eightd.module';

@Module({
  imports: [EightDModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

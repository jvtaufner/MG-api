import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
    }),
  ],
})
export class AppModule {}

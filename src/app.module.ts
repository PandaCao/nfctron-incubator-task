import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DataModule } from './data.module';

@Module({
    imports: [ConfigModule.forRoot(), DataModule],
    controllers: [AppController],
})
export class AppModule {}

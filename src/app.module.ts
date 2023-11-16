import { Module } from '@nestjs/common';
import controllers from './controllers'
import services from './services'
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot()],
  controllers: controllers,
  providers: [...services],
})
export class AppModule {}


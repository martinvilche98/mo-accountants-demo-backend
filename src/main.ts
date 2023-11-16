import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ValidationError } from '@nestjs/common/interfaces';
import { CommandFactory } from 'nest-commander';


export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({    
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
  // await CommandFactory.run(AppModule, ['warn', 'error']);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    // origin: ['http://192.168.1.32:3000',"*"], // Add your frontend URL(s) here
    origin: true, // Add your frontend URL(s) here
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, // Set to true if you're using credentials (e.g., cookies, authorization headers)
  };

  app.enableCors(corsOptions);

 await app.listen(3005);
console.log("server is running");

}
bootstrap();

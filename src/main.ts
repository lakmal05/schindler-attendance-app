import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
 app.use(
   cors({
     origin: 'http://192.168.1.32:3000', // Allow requests only from this origin
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
     credentials: true, // Enable credentials (cookies, authorization headers, etc.)
   }),
 );
 await app.listen(3005);
  // app.use(csurf());
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //enable core for server 
  app.enableCors({
    origin: 'http://localhost:3000', // React's URL
    credentials: true,               
  });

  await app.listen(process.env.PORT || 5000);
}
bootstrap();

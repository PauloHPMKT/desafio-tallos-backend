require('dotenv').config();
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe({
    transform: true,
  }))
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Gerenciador de Funcionários Tallos')
    .setDescription('Utilizando Swagger para documentar as rotas da API de usuário para gerenciador de funcionários')
    .setVersion('1.0')
    .addTag('login')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();

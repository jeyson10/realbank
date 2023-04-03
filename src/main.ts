import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de RealBank')
    .setDescription('Api para gestion de certificados financieros')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  
  // Habilita Swagger UI en la ruta '/api-docs'
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();

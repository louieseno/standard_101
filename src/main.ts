import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiVersion = process.env.API_VERSION;

  app.setGlobalPrefix(`api/${apiVersion}`)

  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('Basic REST API for Users.')
    .setVersion(apiVersion)
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`api/${apiVersion}`, app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import helmet from 'helmet';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  const prismaService: PrismaService = app.get(PrismaService);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.use(helmet());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  SwaggerModule.setup(
    '',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('PetCare')
        .setVersion('1.0')
        .addBearerAuth()
        .build(),
    ),
    {
      swaggerOptions: {
        persistAuthorization: true,
      },
    },
  );

  await prismaService.enableShutdownHooks(app);
  await app.listen(configService.get<number>('app.port'));
}

bootstrap();

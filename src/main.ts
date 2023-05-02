import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  const prismaService: PrismaService = app.get(PrismaService);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(helmet());
  app.enableCors();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

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
  );

  await prismaService.enableShutdownHooks(app);
  await app.listen(configService.get<number>('app.port'));
}

void bootstrap();

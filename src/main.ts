import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { Environments } from './common/enums/environments.enum';
import { swaggerSetup } from './common/swagger/setup.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const environment = process.env.NODE_ENV;
  swaggerSetup(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  if (environment === Environments.PRODUCTION) {
    app.use(helmet()); // Set Security-Related HTTP Headers
    app.enableCors({}); // Allow Requests From Other Domains
  }
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

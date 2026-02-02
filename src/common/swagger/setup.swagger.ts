import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

/* 
  npm install @nestjs/swagger swagger-ui-express
  npm install swagger-themes
*/

export function swaggerSetup(app: INestApplication): void {
  const builder = new DocumentBuilder()
    .setTitle('Store Hub API')
    .setDescription(
      `A NestJS API built to support a SaaS store management platform. 
      It provides features for managing users, stores, and products, 
      secured with JWT authentication and role-based authorization.`.trim(),
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, builder);
  const theme = new SwaggerTheme();
  SwaggerModule.setup('api', app, document, {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}

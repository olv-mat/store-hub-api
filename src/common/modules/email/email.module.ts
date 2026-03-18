import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { EmailDeliveryImplementation } from './email-delivery.service';
import { EmailService } from './email.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: EmailService,
      useClass: EmailDeliveryImplementation,
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}

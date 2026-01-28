import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ResendServiceImplementation } from './resend.service';

// npm i resend

@Global()
@Module({
  providers: [
    {
      provide: EmailService,
      useClass: ResendServiceImplementation,
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { EmailService } from './email.service';

// npm i @nestjs/axios axios

interface EmailDeliveryResponse {
  success: boolean;
  message: string;
}

@Injectable()
export class EmailDeliveryImplementation implements EmailService {
  private readonly logger = new Logger(EmailDeliveryImplementation.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async send(subject: string, text: string): Promise<void> {
    try {
      await firstValueFrom(
        this.httpService.post<EmailDeliveryResponse>(
          this.configService.getOrThrow<string>('EMAIL_DELIVERY_ENDPOINT'),
          {
            subject: subject,
            text: text,
          },
        ),
      );
    } catch (error) {
      this.logger.error(error?.message);
      throw new InternalServerErrorException('Failed to send request store');
    }
  }
}

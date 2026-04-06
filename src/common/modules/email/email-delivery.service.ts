import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { EmailService } from './email.service';

// pnpm add @nestjs/axios axios

interface EmailDeliveryResponse {
  success: boolean;
  message: string;
}

@Injectable()
export class EmailDeliveryImplementation implements EmailService {
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
          {
            headers: {
              Authorization: `Bearer ${this.configService.getOrThrow<string>('EMAIL_DELIVERY_TOKEN')}`,
            },
          },
        ),
      );
    } catch {
      throw new InternalServerErrorException('Failed to send request store');
    }
  }
}

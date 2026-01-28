import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { EmailService } from './email.service';

@Injectable()
export class ResendServiceImplementation implements EmailService {
  private readonly resend: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(
      this.configService.getOrThrow<string>('RESEND_KEY'),
    );
  }

  public async send(subject: string, content: string): Promise<void> {
    const { error } = await this.resend.emails.send({
      from: this.configService.getOrThrow<string>('RESEND_FROM'),
      to: this.configService.getOrThrow<string>('RESEND_TO'),
      subject: subject,
      html: content,
    });
    if (error) {
      throw new InternalServerErrorException('Failed to send request store');
    }
  }
}

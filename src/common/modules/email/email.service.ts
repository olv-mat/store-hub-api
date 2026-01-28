export abstract class EmailService {
  public abstract send(subject: string, content: string): Promise<void>;
}

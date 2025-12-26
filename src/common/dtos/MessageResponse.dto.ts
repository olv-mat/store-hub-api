export class MessageResponseDto {
  public readonly message: string;

  private constructor(message: string) {
    this.message = message;
  }

  public static create(message: string): MessageResponseDto {
    return new MessageResponseDto(message);
  }
}

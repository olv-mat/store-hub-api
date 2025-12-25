export class DefaultResponseDto {
  public readonly id: string;
  public readonly message: string;

  constructor(id: string, message: string) {
    this.id = id;
    this.message = message;
  }

  public static create(id: string, message: string) {
    return new DefaultResponseDto(id, message);
  }
}

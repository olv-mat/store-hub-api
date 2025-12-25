export class DefaultResponseDto {
  public readonly uuid: string;
  public readonly message: string;

  constructor(uuid: string, message: string) {
    this.uuid = uuid;
    this.message = message;
  }

  public static create(uuid: string, message: string) {
    return new DefaultResponseDto(uuid, message);
  }
}

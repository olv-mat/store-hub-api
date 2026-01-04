export abstract class CredentialService {
  public abstract sign<T extends object>(payload: T): Promise<string>;
  public abstract verify<T extends object>(token: string): Promise<T>;
}

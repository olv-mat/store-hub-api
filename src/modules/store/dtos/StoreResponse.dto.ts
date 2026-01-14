import { StoreEntity } from '../entities/store.entity';

type StoreResponseProperties = {
  id: string;
  name: string;
  phone: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
};

export class StoreResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly phone: string;
  public readonly street: string;
  public readonly number: string;
  public readonly neighborhood: string;
  public readonly city: string;
  public readonly state: string;
  public readonly country: string;

  private constructor(properties: StoreResponseProperties) {
    this.id = properties.id;
    this.name = properties.name;
    this.phone = properties.phone;
    this.street = properties.street;
    this.number = properties.number;
    this.neighborhood = properties.neighborhood;
    this.city = properties.city;
    this.state = properties.state;
    this.country = properties.country;
  }

  public static fromEntity(entity: StoreEntity): StoreResponseDto {
    return new StoreResponseDto({
      id: entity.id,
      name: entity.name,
      phone: entity.phone,
      street: entity.street,
      number: entity.number,
      neighborhood: entity.neighborhood,
      city: entity.city,
      state: entity.state,
      country: entity.country,
    });
  }

  public static fromEntities(entities: StoreEntity[]): StoreResponseDto[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
}

import { StoreResponseDto } from 'src/modules/store/dtos/StoreResponse.dto';
import { ProductEntity } from '../entities/product.entity';

type ProductResponseProperties = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
  store?: StoreResponseDto;
};

export class ProductResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly price: number;
  public readonly image: string;
  public readonly inStock: boolean;
  public readonly store?: StoreResponseDto;

  private constructor(properties: ProductResponseProperties) {
    this.id = properties.id;
    this.name = properties.name;
    this.description = properties.description;
    this.price = properties.price;
    this.image = properties.image;
    this.inStock = properties.inStock;
    this.store = properties.store;
  }

  public static fromEntities(entities: ProductEntity[]): ProductResponseDto[] {
    return entities.map((entity) => this.fromEntity(entity));
  }

  public static fromEntity(entity: ProductEntity): ProductResponseDto {
    return new ProductResponseDto({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      image: entity.image,
      inStock: entity.inStock,
      store: entity.store
        ? StoreResponseDto.fromEntity(entity.store)
        : undefined,
    });
  }
}

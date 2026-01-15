import { ProductEntity } from '../entities/product.entity';

export class ProductResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly price: number;
  public readonly image: string;
  public readonly inStock: boolean;

  private constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    image: string,
    inStock: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.inStock = inStock;
  }

  public static fromEntity(entity: ProductEntity): ProductResponseDto {
    return new ProductResponseDto(
      entity.id,
      entity.name,
      entity.description,
      entity.price,
      entity.image,
      entity.inStock,
    );
  }

  public static fromEntities(entities: ProductEntity[]): ProductResponseDto[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRoles } from '../user/enums/user-roles.enum';
import { StoreResponseDto } from './dtos/StoreResponse.dto';
import { StoreService } from './store.service';

@Controller('store')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  @Roles(UserRoles.ADMIN)
  public async findAll(): Promise<StoreResponseDto[]> {
    const storeEntities = await this.storeService.findAll();
    return StoreResponseDto.fromEntities(storeEntities);
  }
}

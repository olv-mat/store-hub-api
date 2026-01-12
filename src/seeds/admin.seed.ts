import * as bcrypt from 'bcrypt';
import { AppDataSource } from 'src/data-source';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserRoles } from 'src/modules/user/enums/user-roles.enum';

// npm run seed:admin

export async function seedAdmin(): Promise<void> {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) return;
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  try {
    const repository = AppDataSource.getRepository(UserEntity);
    const exists = await repository.exists({
      where: { email: ADMIN_EMAIL },
    });
    if (!exists) {
      const salt = await bcrypt.genSalt();
      await repository.save({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: await bcrypt.hash(ADMIN_PASSWORD, salt),
        role: UserRoles.ADMIN,
      });
    }
  } finally {
    await AppDataSource.destroy();
  }
}

void seedAdmin();

import { BadRequestException, Param, ParseUUIDPipe } from '@nestjs/common';

export const IdParam = () => {
  return Param(
    'id',
    new ParseUUIDPipe({
      errorHttpStatusCode: 400,
      exceptionFactory: () => {
        return new BadRequestException('Invalid identifier');
      },
    }),
  );
};

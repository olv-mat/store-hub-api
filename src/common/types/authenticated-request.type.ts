import { Request } from 'express';
import { AccessTokenPayload } from '../modules/credential/contracts/access-token-payload';

export type AuthenticatedRequest = Request & {
  user: AccessTokenPayload;
};

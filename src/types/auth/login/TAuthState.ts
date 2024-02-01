import * as z from 'zod';
import { UserSchema } from './TUser';

const AuthStateSchema = z.object({
  user: UserSchema.nullable(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable()
});

export type TAuthState = z.infer<typeof AuthStateSchema>;

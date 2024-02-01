import { z } from 'zod';

export const UserSchema = z.object({
  userName: z.string(),
  email: z.string(),
  name: z.string()
});

export type TLoginResponse = z.infer<typeof UserSchema>;

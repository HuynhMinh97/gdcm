import * as z from 'zod';

const RefreshTokenSchema = z.object({
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable()
});

export type TRefreshToken = z.infer<typeof RefreshTokenSchema>;

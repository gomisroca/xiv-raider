import { type Prisma } from 'generated/prisma';

type ActionReturn = {
  message: string;
  error?: boolean;
  redirect?: string;
};

type ExtendedCharacter = Prisma.CharacterGetPayload<{
  include: { gear: true; owner: true };
}>;

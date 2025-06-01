import { type Prisma } from 'generated/prisma';

type ActionReturn = {
  message: string;
  error?: boolean;
  redirect?: string;
};

type ExtendedCharacter = Prisma.CharacterGetPayload<{
  select: {
    id: true;
    name: true;
    job: true;
    owner: { select: { id: true; name: true } };
    gear: {
      select: { id: true; type: true; lootType: true; status: true };
    };
  };
}>;

type ExtendedGroup = Prisma.GroupGetPayload<{
  select: {
    id: true;
    name: true;
    createdById: true;
    members: {
      select: { id: true };
    };
    characters: {
      select: {
        id: true;
        name: true;
        job: true;
        owner: { select: { id: true; name: true } };
        gear: {
          select: { id: true; type: true; lootType: true; status: true };
        };
      };
    };
  };
}>;
type SelectGroup = Prisma.GroupGetPayload<{
  select: { id: true; name: true };
}>;

type SelectPlan = Prisma.GroupPlanGetPayload<{
  select: { priority_1: true; priority_2: true; priority_3: true; priority_4: true };
}>;

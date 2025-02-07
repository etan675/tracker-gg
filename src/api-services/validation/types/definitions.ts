import { z } from 'zod';
import { SummonerSpellSchema } from '../schemas/summonerspells-schema';
import { MatchSchema } from '../schemas/match-schema';
import { PerkSchema, PerkStyleSchema } from '../schemas/perks-schema';
import { ItemSchema } from '../schemas/item-schema';

export type SummonerSpellApi = z.infer<typeof SummonerSpellSchema>;

export type MatchApi = z.infer<typeof MatchSchema>;

export type PerkApi = z.infer<typeof PerkSchema>;

export type PerkStyleApi = z.infer<typeof PerkStyleSchema>;

export type ItemApi = z.infer<typeof ItemSchema>;
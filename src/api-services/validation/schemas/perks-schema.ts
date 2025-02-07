import { z } from 'zod';

const PerkSchema = z.object({
    id: z.number(),
    name: z.string(),
    iconPath: z.string(),
});

const PerksSchema = z.array(PerkSchema);

const PerkStyleSchema = z.object({
    id: z.number(),
    name: z.string(),
    iconPath: z.string(),
});

const PerkStylesSchema = z.object({
    schemaVersion: z.number(),
    styles: z.array(PerkStyleSchema)
})

export {
    PerkSchema,
    PerksSchema,
    PerkStyleSchema,
    PerkStylesSchema
}
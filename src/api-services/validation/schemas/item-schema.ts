import { z } from 'zod';

const ItemSchema = z.object({
    id: z.number(),
    name: z.string(),
    iconPath: z.string(),
});

const ItemsSchema = z.array(ItemSchema);

export {
    ItemSchema,
    ItemsSchema
}
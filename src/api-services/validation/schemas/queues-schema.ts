import { z } from 'zod';

const QueuesSchema = z.array(z.object({
    queueId: z.number(),
    map: z.string(),
    description: z.nullable(z.string())
}));

export {
    QueuesSchema
}
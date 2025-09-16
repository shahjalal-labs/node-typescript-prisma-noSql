import * as z from 'zod';

export const createTestSchema = z.object({
  // Define fields
  name: z.string(),
});

export const TestSchemaValidation = {
createTestSchema
};
  
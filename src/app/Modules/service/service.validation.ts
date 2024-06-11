import { z } from "zod";

const serviceValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  duration: z.number(),
  isDeleted: z.boolean(),
});
export default serviceValidationSchema;

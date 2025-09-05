import z from 'zod';
export const signoutinput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string()
});
// signin input
export const signininput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});
// do this for all the routes
//# sourceMappingURL=index.js.map
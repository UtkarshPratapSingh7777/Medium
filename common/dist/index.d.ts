import z from 'zod';
export declare const signoutinput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, z.z.core.$strip>;
export type SignupInput = z.infer<typeof signoutinput>;
export declare const signininput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.z.core.$strip>;
export type SigninInput = z.infer<typeof signininput>;
//# sourceMappingURL=index.d.ts.map
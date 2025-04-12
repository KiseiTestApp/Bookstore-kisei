import {z} from 'zod';

export const signInSchema = z.object({
    email: z.string()
        .nonempty('Email không được để trống')
        .email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 kí tự'),
});

export type SignInFormData = z.infer<typeof signInSchema>


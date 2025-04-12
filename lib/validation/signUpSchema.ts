import {z} from 'zod';

export const signUpSchema = z.object({
    username: z.string().nonempty('Tên phải có ít nhất 1 ký tự'),
    email: z.string().email('Email không đúng định dạng'),
    password: z.string()
        .regex(
            /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
            'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 ký tự đặc biệt và dài ít nhất 8 ký tự'
        )
        .nonempty('Mật khẩu không được để trống'),
    phoneNumber: z.string()
        .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Số điện thoại phải đúng định dạng')
});

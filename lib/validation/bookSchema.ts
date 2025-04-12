import {z} from "zod";

const currentYear = new Date().getFullYear();

export const bookSchema = z.object({
    title: z.string().min(1, 'Tên sách không thể để trống'),
    author: z.string().min(1, 'Tên tác giả không thể để trống'),
    genre: z.string().min(1, 'Vui lòng chọn thể loại'),
    description: z.string().optional(),
    publisher: z.string().min(1, 'Tên nhà xuất bản không thể để trống'),
    publishYear: z.preprocess(
        (value) => Number(value),
        z.number().min(1000, 'Năm không thể nhỏ quá 1000').max(currentYear, `Năm không thể vượt quá ${currentYear}`)
    ),
    price: z.preprocess(
        (value) => Number(value),
        z.number().nonnegative('Giá không thể là số âm').max(1000000000, 'Vượt quá giá tối đa cho phép')
    ),
    discounted: z.preprocess(
        (value) => Number(value),
        z.number().nonnegative('Giá giảm không thể là số âm').optional()
    ),
    imageFile: z
        .instanceof(File, {message: 'Vui lòng tải file ảnh'})
        .optional()
        .nullable(),
    imageUrl: z.string().optional(),
})

export type BookForm = z.infer<typeof bookSchema>


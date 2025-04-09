import { Metadata } from "next";
import BookDetails from "@/app/book-details/components/BookDetails";
import { getBookById } from "@/app/utils/products/getBookById";


export async function generateMetadata({params}: { params: { id: string } }): Promise<Metadata> {
    const book = await getBookById(params.id);
    return {
        title: book?.title || 'Không tìm thấy sách',
        description: book?.description || 'Thông tin sách không khả dụng',
    }
}

export default async function BookPage({params}: { params: { id: string } }) {
    const book = await getBookById(params.id);
    if (!book) {
        return <div>Không tìm thấy sách</div>
    }

    return (
        <div>
            <BookDetails book={book} />
        </div>
    )
}
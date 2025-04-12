import { Metadata } from "next";
import BookDetails from "@/app/book-details/components/BookDetails";
import { getBookById } from "@/app/utils/products/getBookById";


export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const params = await props.params;
    const book = await getBookById(params.id);
    return {
        title: book?.title || 'Không tìm thấy sách',
        description: book?.description || 'Thông tin sách không khả dụng',
    }
}

export default async function BookPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
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